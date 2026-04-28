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
import { ReservationFilterInput } from './dto/reservation-filters.input.js';
import { Reservation } from './reservation.model.js';
import { Book } from '../book/book.model.js';
import { User } from '../user/user.model.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaginatedReservations } from './dto/paginated-reservations.output.js';
import { FindManyReservationsArgs } from './dto/find-many-reservation.args.js';

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

  @Query(() => [Reservation])
  reservationsByBook(
    @Args('bookId') bookId: string,
    @Args('filter', { nullable: true }) filter?: ReservationFilterInput,
  ) {
    return this.service.reservationsByBook(bookId, filter);
  }

  @Query(() => [Reservation])
  reservationsByUser(
    @Args('userId') userId: string,
    @Args('filter', { nullable: true }) filter?: ReservationFilterInput,
  ) {
    return this.service.reservationsByUser(userId, filter);
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
