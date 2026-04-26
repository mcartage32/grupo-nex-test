import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from './book.service.js';
import { Book } from './book.model.js';
import { CreateBookInput } from './dto/create-book.input.js';
import { UpdateBookInput } from './dto/update-book.input.js';
import { FindManyBooksArgs } from './dto/find-many-books.args.js';
import { PaginatedBooks } from './dto/paginated-books.output.js';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  createBook(@Args('data') data: CreateBookInput) {
    return this.bookService.create(data);
  }

  @Query(() => PaginatedBooks)
  findAllBooks(@Args() args: FindManyBooksArgs) {
    return this.bookService.findAll(args);
  }

  @Query(() => Book, { nullable: true })
  book(@Args('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(@Args('data') data: UpdateBookInput) {
    return this.bookService.update(data);
  }

  @Mutation(() => Book)
  deleteBook(@Args('id') id: string) {
    return this.bookService.remove(id);
  }
}
