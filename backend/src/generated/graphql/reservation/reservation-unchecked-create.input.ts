import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ReservationUncheckedCreateInput {

    @Field(() => String, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => String, {nullable:false})
    bookId!: string;

    @Field(() => Date, {nullable:true})
    reservationDate?: Date | string;

    @Field(() => Date, {nullable:false})
    returnDate!: Date | string;

    @Field(() => Boolean, {nullable:true})
    returned?: boolean;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}
