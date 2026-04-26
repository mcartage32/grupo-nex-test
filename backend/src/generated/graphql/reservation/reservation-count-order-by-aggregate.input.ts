import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum.js';

@InputType()
export class ReservationCountOrderByAggregateInput {
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
}
