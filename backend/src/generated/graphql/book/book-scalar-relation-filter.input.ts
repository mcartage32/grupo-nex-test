import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookWhereInput } from './book-where.input.js';

@InputType()
export class BookScalarRelationFilter {
  @Field(() => BookWhereInput, { nullable: true })
  is?: BookWhereInput;

  @Field(() => BookWhereInput, { nullable: true })
  isNot?: BookWhereInput;
}
