import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ReservationFilterInput } from './reservation-filters.input.js';

@ArgsType()
export class ReservationByBookArgs {
  @Field(() => String)
  bookId!: string;

  @Field(() => Int, { defaultValue: 1 })
  page?: number;

  @Field(() => Int, { defaultValue: 10 })
  limit?: number;

  @Field(() => ReservationFilterInput, { nullable: true })
  filter?: ReservationFilterInput;
}
