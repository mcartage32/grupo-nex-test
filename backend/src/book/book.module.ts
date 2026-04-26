import { Module } from '@nestjs/common';
import { BookService } from './book.service.js';
import { BookResolver } from './book.resolver.js';

@Module({
  providers: [BookService, BookResolver],
})
export class BookModule {}
