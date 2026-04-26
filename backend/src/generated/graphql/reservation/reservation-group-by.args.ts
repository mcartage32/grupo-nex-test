import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReservationWhereInput } from './reservation-where.input.js';
import { Type } from 'class-transformer';
import { ReservationOrderByWithAggregationInput } from './reservation-order-by-with-aggregation.input.js';
import { ReservationScalarFieldEnum } from './reservation-scalar-field.enum.js';
import { ReservationScalarWhereWithAggregatesInput } from './reservation-scalar-where-with-aggregates.input.js';
import { Int } from '@nestjs/graphql';
import { ReservationCountAggregateInput } from './reservation-count-aggregate.input.js';
import { ReservationMinAggregateInput } from './reservation-min-aggregate.input.js';
import { ReservationMaxAggregateInput } from './reservation-max-aggregate.input.js';

@ArgsType()
export class ReservationGroupByArgs {
  @Field(() => ReservationWhereInput, { nullable: true })
  @Type(() => ReservationWhereInput)
  where?: ReservationWhereInput;

  @Field(() => [ReservationOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ReservationOrderByWithAggregationInput>;

  @Field(() => [ReservationScalarFieldEnum], { nullable: false })
  by!: Array<`${ReservationScalarFieldEnum}`>;

  @Field(() => ReservationScalarWhereWithAggregatesInput, { nullable: true })
  having?: ReservationScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ReservationCountAggregateInput, { nullable: true })
  _count?: ReservationCountAggregateInput;

  @Field(() => ReservationMinAggregateInput, { nullable: true })
  _min?: ReservationMinAggregateInput;

  @Field(() => ReservationMaxAggregateInput, { nullable: true })
  _max?: ReservationMaxAggregateInput;
}
