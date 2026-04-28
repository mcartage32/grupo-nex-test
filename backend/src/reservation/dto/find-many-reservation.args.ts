import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ReservationFilterInput } from './reservation-filters.input.js';

@ArgsType()
export class FindManyReservationsArgs {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;

  @Field(() => ReservationFilterInput, { nullable: true })
  filter?: ReservationFilterInput;
}
