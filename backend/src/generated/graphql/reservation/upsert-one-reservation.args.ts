import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '../../prisma/client.js';
import { ReservationWhereUniqueInput } from './reservation-where-unique.input.js';
import { Type } from 'class-transformer';
import { ReservationCreateInput } from './reservation-create.input.js';
import { ReservationUpdateInput } from './reservation-update.input.js';

@ArgsType()
export class UpsertOneReservationArgs {
  @Field(() => ReservationWhereUniqueInput, { nullable: false })
  @Type(() => ReservationWhereUniqueInput)
  where!: Prisma.AtLeast<ReservationWhereUniqueInput, 'id'>;

  @Field(() => ReservationCreateInput, { nullable: false })
  @Type(() => ReservationCreateInput)
  create!: ReservationCreateInput;

  @Field(() => ReservationUpdateInput, { nullable: false })
  @Type(() => ReservationUpdateInput)
  update!: ReservationUpdateInput;
}
