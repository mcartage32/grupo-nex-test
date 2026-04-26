import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input.js';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input.js';
import { ReservationUpdateManyWithoutUserNestedInput } from '../reservation/reservation-update-many-without-user-nested.input.js';

@InputType()
export class UserUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  email?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => ReservationUpdateManyWithoutUserNestedInput, { nullable: true })
  Reservation?: ReservationUpdateManyWithoutUserNestedInput;
}
