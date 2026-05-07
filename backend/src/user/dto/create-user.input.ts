/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty({
    message: 'El nombre es obligatorio',
  })
  @MaxLength(100)
  name!: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @IsEmail(
    {},
    {
      message: 'El email no es válido',
    },
  )
  @IsNotEmpty({
    message: 'El email es obligatorio',
  })
  @MaxLength(150)
  email!: string;
}
