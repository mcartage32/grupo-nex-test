import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReservationWhereInput } from './reservation-where.input.js';
import { StringFilter } from '../prisma/string-filter.input.js';
import { DateTimeFilter } from '../prisma/date-time-filter.input.js';
import { BoolFilter } from '../prisma/bool-filter.input.js';
import { BookScalarRelationFilter } from '../book/book-scalar-relation-filter.input.js';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input.js';

@InputType()
export class ReservationWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [ReservationWhereInput], { nullable: true })
  AND?: Array<ReservationWhereInput>;

  @Field(() => [ReservationWhereInput], { nullable: true })
  OR?: Array<ReservationWhereInput>;

  @Field(() => [ReservationWhereInput], { nullable: true })
  NOT?: Array<ReservationWhereInput>;

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

  @Field(() => BookScalarRelationFilter, { nullable: true })
  Book?: BookScalarRelationFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  User?: UserScalarRelationFilter;
}
