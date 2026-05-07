import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  bookId!: string;

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  reservationDate!: Date;

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  returnDate!: Date;
}
