/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty({
    message: 'El título es obligatorio',
  })
  @MaxLength(100)
  title!: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty({
    message: 'El autor es obligatorio',
  })
  @MaxLength(100)
  author!: string;
}
