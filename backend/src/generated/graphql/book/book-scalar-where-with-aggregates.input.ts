import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input.js';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input.js';

@InputType()
export class BookScalarWhereWithAggregatesInput {
  @Field(() => [BookScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<BookScalarWhereWithAggregatesInput>;

  @Field(() => [BookScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<BookScalarWhereWithAggregatesInput>;

  @Field(() => [BookScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<BookScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  title?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  author?: StringWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  createdAt?: DateTimeWithAggregatesFilter;
}
