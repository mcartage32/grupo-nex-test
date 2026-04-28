import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookInput } from './dto/create-book.input.js';
import { UpdateBookInput } from './dto/update-book.input.js';
import { FindManyBooksArgs } from './dto/find-many-books.args.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBookInput) {
    return this.prisma.book.create({
      data,
    });
  }

  async findAll(args: FindManyBooksArgs) {
    const page = args.page ?? 1;
    const limit = args.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.BookWhereInput = {
      title: args.where?.title
        ? {
            contains: args.where.title,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      author: args.where?.author
        ? {
            contains: args.where.author,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
    };

    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          reservations: {
            where: {
              returned: false,
            },
          },
        },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data: data.map((book) => ({
        ...book,
        isAvailable: book.reservations.length === 0,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: string) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  update(data: UpdateBookInput) {
    const { id, ...rest } = data;

    return this.prisma.book.update({
      where: { id },
      data: rest,
    });
  }

  remove(id: string) {
    return this.prisma.book.delete({
      where: { id },
    });
  }

  // Trae los libros que no tengan reservas activas
  // (Ningun libro que tenga reserva en retornado en falso)
  async availableBooks(args: FindManyBooksArgs) {
    const page = args.page ?? 1;
    const limit = args.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.BookWhereInput = {
      reservations: {
        none: {
          returned: false,
        },
      },
    };

    const [data, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAllNoPagination() {
    return this.prisma.book.findMany({
      where: {},
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
