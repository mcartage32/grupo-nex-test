import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../user.model.js';

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  data!: User[];

  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  limit!: number;

  @Field(() => Int)
  totalPages!: number;
}
