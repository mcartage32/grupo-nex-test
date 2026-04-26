import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReservationUncheckedCreateNestedManyWithoutUserInput } from '../reservation/reservation-unchecked-create-nested-many-without-user.input.js';

@InputType()
export class UserUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => ReservationUncheckedCreateNestedManyWithoutUserInput, {
    nullable: true,
  })
  Reservation?: ReservationUncheckedCreateNestedManyWithoutUserInput;
}
