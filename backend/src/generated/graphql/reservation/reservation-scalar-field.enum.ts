import { registerEnumType } from '@nestjs/graphql';

export enum ReservationScalarFieldEnum {
    id = "id",
    userId = "userId",
    bookId = "bookId",
    reservationDate = "reservationDate",
    returnDate = "returnDate",
    returned = "returned",
    createdAt = "createdAt"
}


registerEnumType(ReservationScalarFieldEnum, { name: 'ReservationScalarFieldEnum', description: undefined })
