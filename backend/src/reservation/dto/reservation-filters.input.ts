import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReservationFilterInput {
  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
}
