import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ReservationCountAggregate } from './reservation-count-aggregate.output.js';
import { ReservationMinAggregate } from './reservation-min-aggregate.output.js';
import { ReservationMaxAggregate } from './reservation-max-aggregate.output.js';

@ObjectType()
export class ReservationGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  bookId!: string;

  @Field(() => Date, { nullable: false })
  reservationDate!: Date | string;

  @Field(() => Date, { nullable: false })
  returnDate!: Date | string;

  @Field(() => Boolean, { nullable: false })
  returned!: boolean;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => ReservationCountAggregate, { nullable: true })
  _count?: ReservationCountAggregate;

  @Field(() => ReservationMinAggregate, { nullable: true })
  _min?: ReservationMinAggregate;

  @Field(() => ReservationMaxAggregate, { nullable: true })
  _max?: ReservationMaxAggregate;
}
