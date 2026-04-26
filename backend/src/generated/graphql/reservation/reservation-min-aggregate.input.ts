import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ReservationMinAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    userId?: true;

    @Field(() => Boolean, {nullable:true})
    bookId?: true;

    @Field(() => Boolean, {nullable:true})
    reservationDate?: true;

    @Field(() => Boolean, {nullable:true})
    returnDate?: true;

    @Field(() => Boolean, {nullable:true})
    returned?: true;

    @Field(() => Boolean, {nullable:true})
    createdAt?: true;
}
