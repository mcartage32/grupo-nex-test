import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input.js';
import { DateTimeFilter } from '../prisma/date-time-filter.input.js';
import { BoolFilter } from '../prisma/bool-filter.input.js';

@InputType()
export class ReservationScalarWhereInput {
  @Field(() => [ReservationScalarWhereInput], { nullable: true })
  AND?: Array<ReservationScalarWhereInput>;

  @Field(() => [ReservationScalarWhereInput], { nullable: true })
  OR?: Array<ReservationScalarWhereInput>;

  @Field(() => [ReservationScalarWhereInput], { nullable: true })
  NOT?: Array<ReservationScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  userId?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  bookId?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  reservationDate?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  returnDate?: DateTimeFilter;

  @Field(() => BoolFilter, { nullable: true })
  returned?: BoolFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;
}
