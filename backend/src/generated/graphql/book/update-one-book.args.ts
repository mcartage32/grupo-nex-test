import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BookUpdateInput } from './book-update.input.js';
import { Type } from 'class-transformer';
import { Prisma } from '../../prisma/client.js';
import { BookWhereUniqueInput } from './book-where-unique.input.js';

@ArgsType()
export class UpdateOneBookArgs {
  @Field(() => BookUpdateInput, { nullable: false })
  @Type(() => BookUpdateInput)
  data!: BookUpdateInput;

  @Field(() => BookWhereUniqueInput, { nullable: false })
  @Type(() => BookWhereUniqueInput)
  where!: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'title'>;
}
