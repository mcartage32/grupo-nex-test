import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum.js';
import { ReservationOrderByRelationAggregateInput } from '../reservation/reservation-order-by-relation-aggregate.input.js';

@InputType()
export class BookOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  title?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  author?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => ReservationOrderByRelationAggregateInput, { nullable: true })
  Reservation?: ReservationOrderByRelationAggregateInput;
}
