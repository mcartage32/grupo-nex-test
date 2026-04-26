import { ArgsType, Field, Int } from '@nestjs/graphql';
import { BookWhereInput } from './book-where.input.js';

@ArgsType()
export class FindManyBooksArgs {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;

  @Field(() => BookWhereInput, { nullable: true })
  where?: BookWhereInput;
}
