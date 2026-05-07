import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Book } from '../book/book.model.js';
import { User } from '../user/user.model.js';

@ObjectType()
export class Reservation {
  @Field(() => ID)
  id!: string;

  @Field()
  userId!: string;

  @Field()
  bookId!: string;

  @Field()
  reservationDate!: Date;

  @Field()
  returnDate!: Date;

  @Field()
  returned!: boolean;

  @Field()
  createdAt!: Date;

  @Field({ nullable: true })
  returnedAt?: Date;

  @Field(() => Book)
  book!: Book;

  @Field(() => User)
  user!: User;

  // campos calculados para frontend

  @Field(() => Int)
  daysLeft!: number;

  @Field(() => Boolean)
  isLate!: boolean;

  @Field(() => Int)
  lateDays!: number;
}
