import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Reservation } from '../reservation/reservation.model.js';
import { BookCount } from './book-count.output.js';

@ObjectType()
export class Book {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  author!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => [Reservation], { nullable: true })
  Reservation?: Array<Reservation>;

  @Field(() => BookCount, { nullable: false })
  _count?: BookCount;
}
