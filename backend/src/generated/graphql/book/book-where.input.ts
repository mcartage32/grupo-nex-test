import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input.js';
import { DateTimeFilter } from '../prisma/date-time-filter.input.js';
import { ReservationListRelationFilter } from '../reservation/reservation-list-relation-filter.input.js';

@InputType()
export class BookWhereInput {
  @Field(() => [BookWhereInput], { nullable: true })
  AND?: Array<BookWhereInput>;

  @Field(() => [BookWhereInput], { nullable: true })
  OR?: Array<BookWhereInput>;

  @Field(() => [BookWhereInput], { nullable: true })
  NOT?: Array<BookWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  author?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => ReservationListRelationFilter, { nullable: true })
  Reservation?: ReservationListRelationFilter;
}
