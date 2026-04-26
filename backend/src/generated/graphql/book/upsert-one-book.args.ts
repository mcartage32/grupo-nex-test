import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '../../prisma/client.js';
import { BookWhereUniqueInput } from './book-where-unique.input.js';
import { Type } from 'class-transformer';
import { BookCreateInput } from './book-create.input.js';
import { BookUpdateInput } from './book-update.input.js';

@ArgsType()
export class UpsertOneBookArgs {
  @Field(() => BookWhereUniqueInput, { nullable: false })
  @Type(() => BookWhereUniqueInput)
  where!: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'title'>;

  @Field(() => BookCreateInput, { nullable: false })
  @Type(() => BookCreateInput)
  create!: BookCreateInput;

  @Field(() => BookUpdateInput, { nullable: false })
  @Type(() => BookUpdateInput)
  update!: BookUpdateInput;
}
