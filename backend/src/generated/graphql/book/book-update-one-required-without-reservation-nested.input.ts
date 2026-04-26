import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookCreateWithoutReservationInput } from './book-create-without-reservation.input.js';
import { Type } from 'class-transformer';
import { BookCreateOrConnectWithoutReservationInput } from './book-create-or-connect-without-reservation.input.js';
import { BookUpsertWithoutReservationInput } from './book-upsert-without-reservation.input.js';
import { Prisma } from '../../prisma/client.js';
import { BookWhereUniqueInput } from './book-where-unique.input.js';
import { BookUpdateToOneWithWhereWithoutReservationInput } from './book-update-to-one-with-where-without-reservation.input.js';

@InputType()
export class BookUpdateOneRequiredWithoutReservationNestedInput {
  @Field(() => BookCreateWithoutReservationInput, { nullable: true })
  @Type(() => BookCreateWithoutReservationInput)
  create?: BookCreateWithoutReservationInput;

  @Field(() => BookCreateOrConnectWithoutReservationInput, { nullable: true })
  @Type(() => BookCreateOrConnectWithoutReservationInput)
  connectOrCreate?: BookCreateOrConnectWithoutReservationInput;

  @Field(() => BookUpsertWithoutReservationInput, { nullable: true })
  @Type(() => BookUpsertWithoutReservationInput)
  upsert?: BookUpsertWithoutReservationInput;

  @Field(() => BookWhereUniqueInput, { nullable: true })
  @Type(() => BookWhereUniqueInput)
  connect?: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'title'>;

  @Field(() => BookUpdateToOneWithWhereWithoutReservationInput, {
    nullable: true,
  })
  @Type(() => BookUpdateToOneWithWhereWithoutReservationInput)
  update?: BookUpdateToOneWithWhereWithoutReservationInput;
}
