import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutReservationInput } from './user-update-without-reservation.input.js';
import { Type } from 'class-transformer';
import { UserCreateWithoutReservationInput } from './user-create-without-reservation.input.js';
import { UserWhereInput } from './user-where.input.js';

@InputType()
export class UserUpsertWithoutReservationInput {
  @Field(() => UserUpdateWithoutReservationInput, { nullable: false })
  @Type(() => UserUpdateWithoutReservationInput)
  update!: UserUpdateWithoutReservationInput;

  @Field(() => UserCreateWithoutReservationInput, { nullable: false })
  @Type(() => UserCreateWithoutReservationInput)
  create!: UserCreateWithoutReservationInput;

  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;
}
