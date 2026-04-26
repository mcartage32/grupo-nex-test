import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../prisma/client.js';
import { ReservationWhereUniqueInput } from './reservation-where-unique.input.js';
import { Type } from 'class-transformer';
import { ReservationUpdateWithoutUserInput } from './reservation-update-without-user.input.js';

@InputType()
export class ReservationUpdateWithWhereUniqueWithoutUserInput {
  @Field(() => ReservationWhereUniqueInput, { nullable: false })
  @Type(() => ReservationWhereUniqueInput)
  where!: Prisma.AtLeast<ReservationWhereUniqueInput, 'id'>;

  @Field(() => ReservationUpdateWithoutUserInput, { nullable: false })
  @Type(() => ReservationUpdateWithoutUserInput)
  data!: ReservationUpdateWithoutUserInput;
}
