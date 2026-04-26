import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserInput } from './dto/create-user.input.js';
import { FindManyUsersArgs } from './dto/find-many-users.args.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserInput) {
    return this.prisma.user.create({
      data,
    });
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
}
