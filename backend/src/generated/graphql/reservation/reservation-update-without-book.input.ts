import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input.js';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input.js';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input.js';
import { UserUpdateOneRequiredWithoutReservationNestedInput } from '../user/user-update-one-required-without-reservation-nested.input.js';

@InputType()
export class ReservationUpdateWithoutBookInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  reservationDate?: DateTimeFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  returnDate?: DateTimeFieldUpdateOperationsInput;

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  returned?: BoolFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutReservationNestedInput, {
    nullable: true,
  })
  User?: UserUpdateOneRequiredWithoutReservationNestedInput;
}
