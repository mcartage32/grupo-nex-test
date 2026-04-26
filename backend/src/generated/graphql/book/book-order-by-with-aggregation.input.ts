import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum.js';
import { BookCountOrderByAggregateInput } from './book-count-order-by-aggregate.input.js';
import { BookMaxOrderByAggregateInput } from './book-max-order-by-aggregate.input.js';
import { BookMinOrderByAggregateInput } from './book-min-order-by-aggregate.input.js';

@InputType()
export class BookOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  title?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  author?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => BookCountOrderByAggregateInput, { nullable: true })
  _count?: BookCountOrderByAggregateInput;

  @Field(() => BookMaxOrderByAggregateInput, { nullable: true })
  _max?: BookMaxOrderByAggregateInput;

  @Field(() => BookMinOrderByAggregateInput, { nullable: true })
  _min?: BookMinOrderByAggregateInput;
}
