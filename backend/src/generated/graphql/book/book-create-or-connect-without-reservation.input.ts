import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../prisma/client.js';
import { BookWhereUniqueInput } from './book-where-unique.input.js';
import { Type } from 'class-transformer';
import { BookCreateWithoutReservationInput } from './book-create-without-reservation.input.js';

@InputType()
export class BookCreateOrConnectWithoutReservationInput {
  @Field(() => BookWhereUniqueInput, { nullable: false })
  @Type(() => BookWhereUniqueInput)
  where!: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'title'>;

  @Field(() => BookCreateWithoutReservationInput, { nullable: false })
  @Type(() => BookCreateWithoutReservationInput)
  create!: BookCreateWithoutReservationInput;
}
