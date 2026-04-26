import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BookWhereInput } from './book-where.input.js';
import { StringFilter } from '../prisma/string-filter.input.js';
import { DateTimeFilter } from '../prisma/date-time-filter.input.js';
import { ReservationListRelationFilter } from '../reservation/reservation-list-relation-filter.input.js';

@InputType()
export class BookWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => [BookWhereInput], { nullable: true })
  AND?: Array<BookWhereInput>;

  @Field(() => [BookWhereInput], { nullable: true })
  OR?: Array<BookWhereInput>;

  @Field(() => [BookWhereInput], { nullable: true })
  NOT?: Array<BookWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  author?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => ReservationListRelationFilter, { nullable: true })
  Reservation?: ReservationListRelationFilter;
}
