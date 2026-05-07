import { Module } from '@nestjs/common';
import { BookService } from './book.service.js';
import { BookResolver } from './book.resolver.js';

@Module({
  exports: [BookService],
  providers: [BookService, BookResolver],
})
export class BookModule {}
