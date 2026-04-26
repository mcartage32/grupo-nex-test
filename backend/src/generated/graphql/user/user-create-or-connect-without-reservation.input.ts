import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../prisma/client.js';
import { UserWhereUniqueInput } from './user-where-unique.input.js';
import { Type } from 'class-transformer';
import { UserCreateWithoutReservationInput } from './user-create-without-reservation.input.js';

@InputType()
export class UserCreateOrConnectWithoutReservationInput {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  @Type(() => UserWhereUniqueInput)
  where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserCreateWithoutReservationInput, { nullable: false })
  @Type(() => UserCreateWithoutReservationInput)
  create!: UserCreateWithoutReservationInput;
}
