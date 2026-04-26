import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReservationCreateNestedManyWithoutUserInput } from '../reservation/reservation-create-nested-many-without-user.input.js';

@InputType()
export class UserCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => ReservationCreateNestedManyWithoutUserInput, { nullable: true })
  Reservation?: ReservationCreateNestedManyWithoutUserInput;
}
