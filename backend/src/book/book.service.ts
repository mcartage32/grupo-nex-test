import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookInput } from './dto/create-book.input.js';
import { UpdateBookInput } from './dto/update-book.input.js';
import { FindManyBooksArgs } from './dto/find-many-books.args.js';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBookInput) {
    return this.prisma.book.create({
      data,
    });
  }

  findAll(args: FindManyBooksArgs) {
    return this.prisma.book.findMany({
      where: {
        title: args.where?.title
          ? { contains: args.where.title, mode: 'insensitive' }
          : undefined,
        author: args.where?.author
          ? { contains: args.where.author, mode: 'insensitive' }
          : undefined,
      },
      skip: args.skip,
      take: args.take,
      orderBy: {
        createdAt: 'desc',
      },
    });
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
}
