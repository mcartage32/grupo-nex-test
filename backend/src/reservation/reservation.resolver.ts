import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReservationService } from './reservation.service.js';
import { CreateReservationInput } from './dto/create-reservation.input.js';
import { Reservation } from './reservation.model.js';
import { Book } from '../book/book.model.js';
import { User } from '../user/user.model.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaginatedReservations } from './dto/paginated-reservations.output.js';
import { FindManyReservationsArgs } from './dto/find-many-reservation.args.js';
import { ReservationByUserArgs } from './dto/reservation-by-user.args.js';
import { ReservationByBookArgs } from './dto/reservation-by-book.args.js';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(
    private readonly service: ReservationService,
    private readonly prisma: PrismaService,
  ) {}

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

  @ResolveField(() => Book)
  book(@Parent() reservation: Reservation) {
    return this.prisma.book.findUnique({
      where: { id: reservation.bookId },
    });
  }

  @ResolveField(() => User)
  user(@Parent() reservation: Reservation) {
    return this.prisma.user.findUnique({
      where: { id: reservation.userId },
    });
  }
}
