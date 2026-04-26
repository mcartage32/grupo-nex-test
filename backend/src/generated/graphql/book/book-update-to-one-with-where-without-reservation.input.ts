import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookWhereInput } from './book-where.input.js';
import { Type } from 'class-transformer';
import { BookUpdateWithoutReservationInput } from './book-update-without-reservation.input.js';

@InputType()
export class BookUpdateToOneWithWhereWithoutReservationInput {
  @Field(() => BookWhereInput, { nullable: true })
  @Type(() => BookWhereInput)
  where?: BookWhereInput;

  @Field(() => BookUpdateWithoutReservationInput, { nullable: false })
  @Type(() => BookUpdateWithoutReservationInput)
  data!: BookUpdateWithoutReservationInput;
}
