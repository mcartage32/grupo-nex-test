import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReservationUncheckedCreateNestedManyWithoutBookInput } from '../reservation/reservation-unchecked-create-nested-many-without-book.input.js';

@InputType()
export class BookUncheckedCreateInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  author!: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => ReservationUncheckedCreateNestedManyWithoutBookInput, {
    nullable: true,
  })
  Reservation?: ReservationUncheckedCreateNestedManyWithoutBookInput;
}
