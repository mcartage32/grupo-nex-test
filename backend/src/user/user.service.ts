import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserInput } from './dto/create-user.input.js';
import { FindManyUsersArgs } from './dto/find-many-users.args.js';
import { handlePrismaError } from '../common/errors/prisma-error.handler.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserInput) {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  findAll(args: FindManyUsersArgs) {
    const page = args.page ?? 1;
    const limit = args.limit ?? 10;

    const skip = (page - 1) * limit;

    return Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]).then(([data, total]) => ({
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }));
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Devuelve todos los usuarios que nos estan multados
  findAvailableUsers() {
    return this.prisma.user.findMany({
      where: {
        isBanned: false,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllNoPagination() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async validateUserCanReserve(userId: string) {
    const user = await this.findOne(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isBanned) {
      throw new BadRequestException(
        'User is banned due to overdue reservations',
      );
    }

    const activeReservations = await this.prisma.reservation.count({
      where: {
        userId,
        returned: false,
      },
    });

    if (activeReservations >= 3) {
      throw new BadRequestException('This user already has 3 books reserved');
    }

    return user;
  }

  async banUser(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isBanned: true },
    });
  }
}
