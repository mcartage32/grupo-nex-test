import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input.js';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input.js';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input.js';

@InputType()
export class ReservationScalarWhereWithAggregatesInput {
  @Field(() => [ReservationScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ReservationScalarWhereWithAggregatesInput>;

  @Field(() => [ReservationScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ReservationScalarWhereWithAggregatesInput>;

  @Field(() => [ReservationScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ReservationScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  userId?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  bookId?: StringWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  reservationDate?: DateTimeWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  returnDate?: DateTimeWithAggregatesFilter;

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  returned?: BoolWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter;
}
