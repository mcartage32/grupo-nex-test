import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { BookCountAggregate } from './book-count-aggregate.output.js';
import { BookMinAggregate } from './book-min-aggregate.output.js';
import { BookMaxAggregate } from './book-max-aggregate.output.js';

@ObjectType()
export class BookGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  author!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string;

  @Field(() => BookCountAggregate, { nullable: true })
  _count?: BookCountAggregate;

  @Field(() => BookMinAggregate, { nullable: true })
  _min?: BookMinAggregate;

  @Field(() => BookMaxAggregate, { nullable: true })
  _max?: BookMaxAggregate;
}
