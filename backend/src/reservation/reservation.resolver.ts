import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReservationService } from './reservation.service.js';
import { CreateReservationInput } from './dto/create-reservation.input.js';
import { Reservation } from './reservation.model.js';
import { PaginatedReservations } from './dto/paginated-reservations.output.js';
import { FindManyReservationsArgs } from './dto/find-many-reservation.args.js';
import { ReservationByUserArgs } from './dto/reservation-by-user.args.js';
import { ReservationByBookArgs } from './dto/reservation-by-book.args.js';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(private readonly service: ReservationService) {}

  @Mutation(() => Reservation)
  createReservation(@Args('data') data: CreateReservationInput) {
    return this.service.create(data);
  }

  @Mutation(() => Reservation)
  returnBook(@Args('reservationId') id: string) {
    return this.service.returnBook(id);
  }

  @Query(() => PaginatedReservations)
  reservationsByBook(@Args() args: ReservationByBookArgs) {
    return this.service.reservationsByBook(args);
  }

  @Query(() => PaginatedReservations)
  reservationsByUser(@Args() args: ReservationByUserArgs) {
    return this.service.reservationsByUser(args);
  }

  @Query(() => PaginatedReservations)
  allReservations(@Args() args: FindManyReservationsArgs) {
    return this.service.allReservations(args);
  }
}
