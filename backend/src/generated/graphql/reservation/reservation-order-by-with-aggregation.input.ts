import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum.js';
import { ReservationCountOrderByAggregateInput } from './reservation-count-order-by-aggregate.input.js';
import { ReservationMaxOrderByAggregateInput } from './reservation-max-order-by-aggregate.input.js';
import { ReservationMinOrderByAggregateInput } from './reservation-min-order-by-aggregate.input.js';

@InputType()
export class ReservationOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  bookId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  reservationDate?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  returnDate?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  returned?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => ReservationCountOrderByAggregateInput, { nullable: true })
  _count?: ReservationCountOrderByAggregateInput;

  @Field(() => ReservationMaxOrderByAggregateInput, { nullable: true })
  _max?: ReservationMaxOrderByAggregateInput;

  @Field(() => ReservationMinOrderByAggregateInput, { nullable: true })
  _min?: ReservationMinOrderByAggregateInput;
}
