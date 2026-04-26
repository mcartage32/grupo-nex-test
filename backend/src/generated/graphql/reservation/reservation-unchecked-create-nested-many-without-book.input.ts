import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReservationCreateWithoutBookInput } from './reservation-create-without-book.input.js';
import { Type } from 'class-transformer';
import { ReservationCreateOrConnectWithoutBookInput } from './reservation-create-or-connect-without-book.input.js';
import { ReservationCreateManyBookInputEnvelope } from './reservation-create-many-book-input-envelope.input.js';
import { Prisma } from '../../prisma/client.js';
import { ReservationWhereUniqueInput } from './reservation-where-unique.input.js';

@InputType()
export class ReservationUncheckedCreateNestedManyWithoutBookInput {
  @Field(() => [ReservationCreateWithoutBookInput], { nullable: true })
  @Type(() => ReservationCreateWithoutBookInput)
  create?: Array<ReservationCreateWithoutBookInput>;

  @Field(() => [ReservationCreateOrConnectWithoutBookInput], { nullable: true })
  @Type(() => ReservationCreateOrConnectWithoutBookInput)
  connectOrCreate?: Array<ReservationCreateOrConnectWithoutBookInput>;

  @Field(() => ReservationCreateManyBookInputEnvelope, { nullable: true })
  @Type(() => ReservationCreateManyBookInputEnvelope)
  createMany?: ReservationCreateManyBookInputEnvelope;

  @Field(() => [ReservationWhereUniqueInput], { nullable: true })
  @Type(() => ReservationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ReservationWhereUniqueInput, 'id'>>;
}
