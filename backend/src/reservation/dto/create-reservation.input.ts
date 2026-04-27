import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field()
  userId!: string;

  @Field()
  bookId!: string;

  @Field(() => Date)
  reservationDate!: Date;

  @Field(() => Date)
  returnDate!: Date;
}
