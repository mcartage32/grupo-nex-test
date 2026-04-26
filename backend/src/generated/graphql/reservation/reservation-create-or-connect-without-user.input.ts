import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../prisma/client.js';
import { ReservationWhereUniqueInput } from './reservation-where-unique.input.js';
import { Type } from 'class-transformer';
import { ReservationCreateWithoutUserInput } from './reservation-create-without-user.input.js';

@InputType()
export class ReservationCreateOrConnectWithoutUserInput {
  @Field(() => ReservationWhereUniqueInput, { nullable: false })
  @Type(() => ReservationWhereUniqueInput)
  where!: Prisma.AtLeast<ReservationWhereUniqueInput, 'id'>;

  @Field(() => ReservationCreateWithoutUserInput, { nullable: false })
  @Type(() => ReservationCreateWithoutUserInput)
  create!: ReservationCreateWithoutUserInput;
}
