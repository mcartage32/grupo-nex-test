import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutReservationInput } from './user-create-without-reservation.input.js';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutReservationInput } from './user-create-or-connect-without-reservation.input.js';
import { Prisma } from '../../prisma/client.js';
import { UserWhereUniqueInput } from './user-where-unique.input.js';

@InputType()
export class UserCreateNestedOneWithoutReservationInput {
  @Field(() => UserCreateWithoutReservationInput, { nullable: true })
  @Type(() => UserCreateWithoutReservationInput)
  create?: UserCreateWithoutReservationInput;

  @Field(() => UserCreateOrConnectWithoutReservationInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutReservationInput)
  connectOrCreate?: UserCreateOrConnectWithoutReservationInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;
}
