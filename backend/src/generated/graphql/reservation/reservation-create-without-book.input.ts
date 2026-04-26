import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutReservationInput } from '../user/user-create-nested-one-without-reservation.input.js';

@InputType()
export class ReservationCreateWithoutBookInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: true })
  reservationDate?: Date | string;

  @Field(() => Date, { nullable: false })
  returnDate!: Date | string;

  @Field(() => Boolean, { nullable: true })
  returned?: boolean;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => UserCreateNestedOneWithoutReservationInput, { nullable: false })
  User!: UserCreateNestedOneWithoutReservationInput;
}
