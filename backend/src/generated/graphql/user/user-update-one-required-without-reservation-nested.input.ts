import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutReservationInput } from './user-create-without-reservation.input.js';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutReservationInput } from './user-create-or-connect-without-reservation.input.js';
import { UserUpsertWithoutReservationInput } from './user-upsert-without-reservation.input.js';
import { Prisma } from '../../prisma/client.js';
import { UserWhereUniqueInput } from './user-where-unique.input.js';
import { UserUpdateToOneWithWhereWithoutReservationInput } from './user-update-to-one-with-where-without-reservation.input.js';

@InputType()
export class UserUpdateOneRequiredWithoutReservationNestedInput {
  @Field(() => UserCreateWithoutReservationInput, { nullable: true })
  @Type(() => UserCreateWithoutReservationInput)
  create?: UserCreateWithoutReservationInput;

  @Field(() => UserCreateOrConnectWithoutReservationInput, { nullable: true })
  @Type(() => UserCreateOrConnectWithoutReservationInput)
  connectOrCreate?: UserCreateOrConnectWithoutReservationInput;

  @Field(() => UserUpsertWithoutReservationInput, { nullable: true })
  @Type(() => UserUpsertWithoutReservationInput)
  upsert?: UserUpsertWithoutReservationInput;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  @Type(() => UserWhereUniqueInput)
  connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email'>;

  @Field(() => UserUpdateToOneWithWhereWithoutReservationInput, {
    nullable: true,
  })
  @Type(() => UserUpdateToOneWithWhereWithoutReservationInput)
  update?: UserUpdateToOneWithWhereWithoutReservationInput;
}
