import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from '../book.model.js';

@ObjectType()
export class PaginatedBooks {
  @Field(() => [Book])
  data!: Book[];

  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  limit!: number;

  @Field(() => Int)
  totalPages!: number;
}
