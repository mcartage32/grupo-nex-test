import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BookWhereInput } from './book-where.input.js';
import { Type } from 'class-transformer';
import { BookOrderByWithAggregationInput } from './book-order-by-with-aggregation.input.js';
import { BookScalarFieldEnum } from './book-scalar-field.enum.js';
import { BookScalarWhereWithAggregatesInput } from './book-scalar-where-with-aggregates.input.js';
import { Int } from '@nestjs/graphql';
import { BookCountAggregateInput } from './book-count-aggregate.input.js';
import { BookMinAggregateInput } from './book-min-aggregate.input.js';
import { BookMaxAggregateInput } from './book-max-aggregate.input.js';

@ArgsType()
export class BookGroupByArgs {
  @Field(() => BookWhereInput, { nullable: true })
  @Type(() => BookWhereInput)
  where?: BookWhereInput;

  @Field(() => [BookOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<BookOrderByWithAggregationInput>;

  @Field(() => [BookScalarFieldEnum], { nullable: false })
  by!: Array<`${BookScalarFieldEnum}`>;

  @Field(() => BookScalarWhereWithAggregatesInput, { nullable: true })
  having?: BookScalarWhereWithAggregatesInput;

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
