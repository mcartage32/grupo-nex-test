import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookCreateNestedOneWithoutReservationInput } from '../book/book-create-nested-one-without-reservation.input.js';
import { UserCreateNestedOneWithoutReservationInput } from '../user/user-create-nested-one-without-reservation.input.js';

@InputType()
export class ReservationCreateInput {
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

  @Field(() => BookCreateNestedOneWithoutReservationInput, { nullable: false })
  Book!: BookCreateNestedOneWithoutReservationInput;

  @Field(() => UserCreateNestedOneWithoutReservationInput, { nullable: false })
  User!: UserCreateNestedOneWithoutReservationInput;
}
