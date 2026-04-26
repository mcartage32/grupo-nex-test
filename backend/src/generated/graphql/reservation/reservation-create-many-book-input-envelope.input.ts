import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReservationCreateManyBookInput } from './reservation-create-many-book.input.js';
import { Type } from 'class-transformer';

@InputType()
export class ReservationCreateManyBookInputEnvelope {
  @Field(() => [ReservationCreateManyBookInput], { nullable: false })
  @Type(() => ReservationCreateManyBookInput)
  data!: Array<ReservationCreateManyBookInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
