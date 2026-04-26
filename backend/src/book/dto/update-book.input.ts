import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input.js';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => ID)
  id!: string;
}
