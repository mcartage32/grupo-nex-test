import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BookWhereInput } from './book-where.input.js';
import { Type } from 'class-transformer';
import { BookOrderByWithRelationInput } from './book-order-by-with-relation.input.js';
import { Prisma } from '../../prisma/client.js';
import { BookWhereUniqueInput } from './book-where-unique.input.js';
import { Int } from '@nestjs/graphql';
import { BookScalarFieldEnum } from './book-scalar-field.enum.js';

@ArgsType()
export class FindFirstBookOrThrowArgs {
  @Field(() => BookWhereInput, { nullable: true })
  @Type(() => BookWhereInput)
  where?: BookWhereInput;

  @Field(() => [BookOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<BookOrderByWithRelationInput>;

  @Field(() => BookWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'title'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [BookScalarFieldEnum], { nullable: true })
  distinct?: Array<`${BookScalarFieldEnum}`>;
}
