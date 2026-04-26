import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReservationWhereInput } from './reservation-where.input.js';
import { Type } from 'class-transformer';
import { ReservationOrderByWithRelationInput } from './reservation-order-by-with-relation.input.js';
import { Prisma } from '../../prisma/client.js';
import { ReservationWhereUniqueInput } from './reservation-where-unique.input.js';
import { Int } from '@nestjs/graphql';
import { ReservationScalarFieldEnum } from './reservation-scalar-field.enum.js';

@ArgsType()
export class FindManyReservationArgs {
  @Field(() => ReservationWhereInput, { nullable: true })
  @Type(() => ReservationWhereInput)
  where?: ReservationWhereInput;

  @Field(() => [ReservationOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ReservationOrderByWithRelationInput>;

  @Field(() => ReservationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ReservationWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ReservationScalarFieldEnum], { nullable: true })
  distinct?: Array<`${ReservationScalarFieldEnum}`>;
}
