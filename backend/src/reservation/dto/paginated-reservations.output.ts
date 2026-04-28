import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Reservation } from '../reservation.model.js';

@ObjectType()
export class PaginatedReservations {
  @Field(() => [Reservation])
  data!: Reservation[];

  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  limit!: number;

  @Field(() => Int)
  totalPages!: number;
}
