import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookUpdateWithoutReservationInput } from './book-update-without-reservation.input.js';
import { Type } from 'class-transformer';
import { BookCreateWithoutReservationInput } from './book-create-without-reservation.input.js';
import { BookWhereInput } from './book-where.input.js';

@InputType()
export class BookUpsertWithoutReservationInput {
  @Field(() => BookUpdateWithoutReservationInput, { nullable: false })
  @Type(() => BookUpdateWithoutReservationInput)
  update!: BookUpdateWithoutReservationInput;

  @Field(() => BookCreateWithoutReservationInput, { nullable: false })
  @Type(() => BookCreateWithoutReservationInput)
  create!: BookCreateWithoutReservationInput;

  @Field(() => BookWhereInput, { nullable: true })
  @Type(() => BookWhereInput)
  where?: BookWhereInput;
}
