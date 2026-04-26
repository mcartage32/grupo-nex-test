import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../prisma/client.js';
import { ReservationWhereUniqueInput } from './reservation-where-unique.input.js';
import { Type } from 'class-transformer';
import { ReservationCreateWithoutBookInput } from './reservation-create-without-book.input.js';

@InputType()
export class ReservationCreateOrConnectWithoutBookInput {
  @Field(() => ReservationWhereUniqueInput, { nullable: false })
  @Type(() => ReservationWhereUniqueInput)
  where!: Prisma.AtLeast<ReservationWhereUniqueInput, 'id'>;

  @Field(() => ReservationCreateWithoutBookInput, { nullable: false })
  @Type(() => ReservationCreateWithoutBookInput)
  create!: ReservationCreateWithoutBookInput;
}
