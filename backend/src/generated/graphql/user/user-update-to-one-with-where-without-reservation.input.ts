import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input.js';
import { Type } from 'class-transformer';
import { UserUpdateWithoutReservationInput } from './user-update-without-reservation.input.js';

@InputType()
export class UserUpdateToOneWithWhereWithoutReservationInput {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => UserUpdateWithoutReservationInput, { nullable: false })
  @Type(() => UserUpdateWithoutReservationInput)
  data!: UserUpdateWithoutReservationInput;
}
