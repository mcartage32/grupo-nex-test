import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReturnBookInput {
  @Field()
  reservationId!: string;
}
