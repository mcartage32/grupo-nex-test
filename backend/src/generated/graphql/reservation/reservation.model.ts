import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Book } from '../book/book.model.js';
import { User } from '../user/user.model.js';

@ObjectType()
export class Reservation {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  bookId!: string;

  @Field(() => Date, { nullable: false })
  reservationDate!: Date;

  @Field(() => Date, { nullable: false })
  returnDate!: Date;

  @Field(() => Boolean, { defaultValue: false, nullable: false })
  returned!: boolean;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Book, { nullable: false })
  Book?: Book;

  @Field(() => User, { nullable: false })
  User?: User;
}
