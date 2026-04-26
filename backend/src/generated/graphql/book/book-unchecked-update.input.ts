import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input.js';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input.js';
import { ReservationUncheckedUpdateManyWithoutBookNestedInput } from '../reservation/reservation-unchecked-update-many-without-book-nested.input.js';

@InputType()
export class BookUncheckedUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  author?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => ReservationUncheckedUpdateManyWithoutBookNestedInput, {
    nullable: true,
  })
  Reservation?: ReservationUncheckedUpdateManyWithoutBookNestedInput;
}
