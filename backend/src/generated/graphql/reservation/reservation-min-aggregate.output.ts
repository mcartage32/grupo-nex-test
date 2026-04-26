import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReservationMinAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    userId?: string;

    @Field(() => String, {nullable:true})
    bookId?: string;

    @Field(() => Date, {nullable:true})
    reservationDate?: Date | string;

    @Field(() => Date, {nullable:true})
    returnDate?: Date | string;

    @Field(() => Boolean, {nullable:true})
    returned?: boolean;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}
