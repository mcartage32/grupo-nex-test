import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service.js';
import { User } from './user.model.js';
import { CreateUserInput } from './dto/create-user.input.js';
import { FindManyUsersArgs } from './dto/find-many-users.args.js';
import { PaginatedUsers } from './dto/paginated-users.output.js';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserInput) {
    return this.userService.create(data);
  }

  @Query(() => PaginatedUsers)
  findAllUsers(@Args() args: FindManyUsersArgs) {
    return this.userService.findAll(args);
  }

  @Query(() => User, { nullable: true })
  user(@Args('id') id: string) {
    return this.userService.findOne(id);
  }
}
