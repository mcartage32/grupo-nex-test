import { ArgsType, Field, Int } from '@nestjs/graphql';
import { BookWhereInput } from './book-where.input.js';

@ArgsType()
export class FindManyBooksArgs {
  @Field(() => BookWhereInput, { nullable: true })
  where?: BookWhereInput;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;
}
