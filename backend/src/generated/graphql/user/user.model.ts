import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Reservation } from '../reservation/reservation.model.js';
import { UserCount } from './user-count.output.js';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => [Reservation], { nullable: true })
  Reservation?: Array<Reservation>;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}
