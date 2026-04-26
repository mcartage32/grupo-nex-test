import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookCreateWithoutReservationInput } from './book-create-without-reservation.input.js';
import { Type } from 'class-transformer';
import { BookCreateOrConnectWithoutReservationInput } from './book-create-or-connect-without-reservation.input.js';
import { Prisma } from '../../prisma/client.js';
import { BookWhereUniqueInput } from './book-where-unique.input.js';

@InputType()
export class BookCreateNestedOneWithoutReservationInput {
  @Field(() => BookCreateWithoutReservationInput, { nullable: true })
  @Type(() => BookCreateWithoutReservationInput)
  create?: BookCreateWithoutReservationInput;

  @Field(() => BookCreateOrConnectWithoutReservationInput, { nullable: true })
  @Type(() => BookCreateOrConnectWithoutReservationInput)
  connectOrCreate?: BookCreateOrConnectWithoutReservationInput;

  @Field(() => BookWhereUniqueInput, { nullable: true })
  @Type(() => BookWhereUniqueInput)
  connect?: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'title'>;
}
