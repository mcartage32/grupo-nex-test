import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ReservationFilterInput } from './reservation-filters.input.js';

@ArgsType()
export class ReservationByUserArgs {
  @Field(() => String)
  userId!: string;

  @Field(() => Int, { defaultValue: 1 })
  page?: number;

  @Field(() => Int, { defaultValue: 10 })
  limit?: number;

  @Field(() => ReservationFilterInput, { nullable: true })
  filter?: ReservationFilterInput;
}
