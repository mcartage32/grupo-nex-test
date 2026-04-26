import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReservationScalarWhereInput } from './reservation-scalar-where.input.js';
import { Type } from 'class-transformer';
import { ReservationUpdateManyMutationInput } from './reservation-update-many-mutation.input.js';

@InputType()
export class ReservationUpdateManyWithWhereWithoutUserInput {
  @Field(() => ReservationScalarWhereInput, { nullable: false })
  @Type(() => ReservationScalarWhereInput)
  where!: ReservationScalarWhereInput;

  @Field(() => ReservationUpdateManyMutationInput, { nullable: false })
  @Type(() => ReservationUpdateManyMutationInput)
  data!: ReservationUpdateManyMutationInput;
}
