import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '../../prisma/client.js';
import { BookWhereUniqueInput } from './book-where-unique.input.js';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneBookArgs {
  @Field(() => BookWhereUniqueInput, { nullable: false })
  @Type(() => BookWhereUniqueInput)
  where!: Prisma.AtLeast<BookWhereUniqueInput, 'id' | 'title'>;
}
