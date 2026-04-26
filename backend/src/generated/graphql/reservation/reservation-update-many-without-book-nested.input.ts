import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReservationCreateWithoutBookInput } from './reservation-create-without-book.input.js';
import { Type } from 'class-transformer';
import { ReservationCreateOrConnectWithoutBookInput } from './reservation-create-or-connect-without-book.input.js';
import { ReservationUpsertWithWhereUniqueWithoutBookInput } from './reservation-upsert-with-where-unique-without-book.input.js';
import { ReservationCreateManyBookInputEnvelope } from './reservation-create-many-book-input-envelope.input.js';
import { Prisma } from '../../prisma/client.js';
import { ReservationWhereUniqueInput } from './reservation-where-unique.input.js';
import { ReservationUpdateWithWhereUniqueWithoutBookInput } from './reservation-update-with-where-unique-without-book.input.js';
import { ReservationUpdateManyWithWhereWithoutBookInput } from './reservation-update-many-with-where-without-book.input.js';
import { ReservationScalarWhereInput } from './reservation-scalar-where.input.js';

@InputType()
export class ReservationUpdateManyWithoutBookNestedInput {
  @Field(() => [ReservationCreateWithoutBookInput], { nullable: true })
  @Type(() => ReservationCreateWithoutBookInput)
  create?: Array<ReservationCreateWithoutBookInput>;

  @Field(() => [ReservationCreateOrConnectWithoutBookInput], { nullable: true })
  @Type(() => ReservationCreateOrConnectWithoutBookInput)
  connectOrCreate?: Array<ReservationCreateOrConnectWithoutBookInput>;

  @Field(() => [ReservationUpsertWithWhereUniqueWithoutBookInput], {
    nullable: true,
  })
  @Type(() => ReservationUpsertWithWhereUniqueWithoutBookInput)
  upsert?: Array<ReservationUpsertWithWhereUniqueWithoutBookInput>;

  @Field(() => ReservationCreateManyBookInputEnvelope, { nullable: true })
  @Type(() => ReservationCreateManyBookInputEnvelope)
  createMany?: ReservationCreateManyBookInputEnvelope;

  @Field(() => [ReservationWhereUniqueInput], { nullable: true })
  @Type(() => ReservationWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ReservationWhereUniqueInput, 'id'>>;

  @Field(() => [ReservationWhereUniqueInput], { nullable: true })
  @Type(() => ReservationWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ReservationWhereUniqueInput, 'id'>>;

  @Field(() => [ReservationWhereUniqueInput], { nullable: true })
  @Type(() => ReservationWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ReservationWhereUniqueInput, 'id'>>;

  @Field(() => [ReservationWhereUniqueInput], { nullable: true })
  @Type(() => ReservationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ReservationWhereUniqueInput, 'id'>>;

  @Field(() => [ReservationUpdateWithWhereUniqueWithoutBookInput], {
    nullable: true,
  })
  @Type(() => ReservationUpdateWithWhereUniqueWithoutBookInput)
  update?: Array<ReservationUpdateWithWhereUniqueWithoutBookInput>;

  @Field(() => [ReservationUpdateManyWithWhereWithoutBookInput], {
    nullable: true,
  })
  @Type(() => ReservationUpdateManyWithWhereWithoutBookInput)
  updateMany?: Array<ReservationUpdateManyWithWhereWithoutBookInput>;

  @Field(() => [ReservationScalarWhereInput], { nullable: true })
  @Type(() => ReservationScalarWhereInput)
  deleteMany?: Array<ReservationScalarWhereInput>;
}
