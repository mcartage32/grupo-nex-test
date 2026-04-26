import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum.js';
import { BookOrderByWithRelationInput } from '../book/book-order-by-with-relation.input.js';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input.js';

@InputType()
export class ReservationOrderByWithRelationInput {
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

  @Field(() => BookOrderByWithRelationInput, { nullable: true })
  Book?: BookOrderByWithRelationInput;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  User?: UserOrderByWithRelationInput;
}
