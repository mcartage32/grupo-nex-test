import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BookWhereInput } from './book-where.input.js';
import { Type } from 'class-transformer';
import { BookOrderByWithRelationInput } from './book-order-by-with-relation.input.js';
import { Prisma } from '../../prisma/client.js';
import { BookWhereUniqueInput } from './book-where-unique.input.js';
import { Int } from '@nestjs/graphql';
import { BookCountAggregateInput } from './book-count-aggregate.input.js';
import { BookMinAggregateInput } from './book-min-aggregate.input.js';
import { BookMaxAggregateInput } from './book-max-aggregate.input.js';

@ArgsType()
export class BookAggregateArgs {
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

  @Field(() => BookCountAggregateInput, { nullable: true })
  _count?: BookCountAggregateInput;

  @Field(() => BookMinAggregateInput, { nullable: true })
  _min?: BookMinAggregateInput;

  @Field(() => BookMaxAggregateInput, { nullable: true })
  _max?: BookMaxAggregateInput;
}
