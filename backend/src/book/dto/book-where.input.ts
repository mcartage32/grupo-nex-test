import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class BookWhereInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  author?: string;
}
