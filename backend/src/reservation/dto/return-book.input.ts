import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class ReturnBookInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  reservationId!: string;
}
