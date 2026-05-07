import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReservationInput } from './dto/create-reservation.input.js';
import { Prisma } from '../generated/prisma/client.js';
import { FindManyReservationsArgs } from './dto/find-many-reservation.args.js';
import { ReservationByUserArgs } from './dto/reservation-by-user.args.js';
import { ReservationByBookArgs } from './dto/reservation-by-book.args.js';
import { UserService } from '../user/user.service.js';
import { BookService } from '../book/book.service.js';
import {
  calculateLateReservation,
  diffDays,
  nowColombia,
  toDateOnly,
  todayColombia,
} from '../common/utils/dates.utils.js';
import { validateDates } from '../common/utils/reservation.utils.js';

type ReservationWithRelations = Prisma.ReservationGetPayload<{
  include: typeof reservationInclude;
}>;

// Formatear las fechas (sin horas ni minutos) y se agrega los dia de retraso
// y dias que falta para entregar el libro
function getReservationMeta(reservation: ReservationWithRelations) {
  const today = todayColombia();
  const returnDate = toDateOnly(new Date(reservation.returnDate));
  const daysLeft = diffDays(returnDate, today);
  return {
    ...reservation,
    daysLeft,
    isLate: daysLeft < 0,
    lateDays: daysLeft < 0 ? Math.abs(daysLeft) : 0,
  };
}

const reservationInclude = {
  book: true,
  user: true,
};

@Injectable()
export class ReservationService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private bookService: BookService,
  ) {}

  private getPagination(args: { page?: number; limit?: number }) {
    const page = args.page ?? 1;
    const limit = args.limit ?? 10;
    return {
      page,
      limit,
      skip: (page - 1) * limit,
    };
  }

  private buildDateFilter(filter?: { startDate?: Date; endDate?: Date }) {
    return {
      reservationDate: {
        gte: filter?.startDate,
        lte: filter?.endDate,
      },
    };
  }

  private buildPaginatedResponse(
    data: ReservationWithRelations[],
    total: number,
    page: number,
    limit: number,
  ) {
    return {
      data: data.map(getReservationMeta),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(data: CreateReservationInput) {
    const { userId, bookId, returnDate, reservationDate } = data;

    // Validar que el usuario pueda reservar (no esté baneado o tenga multas pendientes)
    await this.userService.validateUserCanReserve(userId);
    // Validar que el libro esté disponible para reservar
    await this.bookService.validateBookAvailability(bookId);
    // Validar las fechas de reserva y devolución
    validateDates(reservationDate.toString(), returnDate.toString());

    // crear reserva
    return this.prisma.reservation.create({
      data: {
        userId,
        bookId,
        returnDate,
        reservationDate,
      },
      include: reservationInclude,
    });
  }

  async returnBook(reservationId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { user: true },
    });

    if (!reservation) {
      throw new BadRequestException('Reservation not found');
    }

    if (reservation.returned) {
      throw new BadRequestException('The book has already been returned');
    }

    const { isLate, lateDays } = calculateLateReservation(
      reservation.returnDate,
    );

    const updated = await this.prisma.reservation.update({
      where: { id: reservationId },
      data: {
        returned: true,
        returnedAt: nowColombia(),
      },
      include: { book: true, user: true },
    });

    // Si esta retrasado se multa el usuario
    if (isLate) {
      await this.userService.banUser(reservation.userId);
    }

    return {
      ...updated,
      isLate,
      lateDays,
    };
  }

  // Reservas por libro
  async reservationsByBook(args: ReservationByBookArgs) {
    const { page, limit, skip } = this.getPagination(args);

    const where: Prisma.ReservationWhereInput = {
      bookId: args.bookId,
      ...this.buildDateFilter(args.filter),
    };

    const [data, total] = await Promise.all([
      this.prisma.reservation.findMany({
        where,
        skip,
        take: limit,
        include: reservationInclude,
        orderBy: {
          reservationDate: 'desc',
        },
      }),
      this.prisma.reservation.count({ where }),
    ]);

    return this.buildPaginatedResponse(data, total, page, limit);
  }

  // Reservas por usuario
  async reservationsByUser(args: ReservationByUserArgs) {
    const { page, limit, skip } = this.getPagination(args);

    const where: Prisma.ReservationWhereInput = {
      userId: args.userId,
      ...this.buildDateFilter(args.filter),
    };

    const [data, total] = await Promise.all([
      this.prisma.reservation.findMany({
        where,
        skip,
        take: limit,
        include: reservationInclude,
        orderBy: {
          reservationDate: 'desc',
        },
      }),
      this.prisma.reservation.count({ where }),
    ]);

    return this.buildPaginatedResponse(data, total, page, limit);
  }

  async allReservations(args: FindManyReservationsArgs) {
    const { page, limit, skip } = this.getPagination(args);

    const where: Prisma.ReservationWhereInput = {
      ...this.buildDateFilter(args.filter),
    };

    const [data, total] = await Promise.all([
      this.prisma.reservation.findMany({
        where,
        skip,
        take: limit,
        include: reservationInclude,
        orderBy: {
          reservationDate: 'desc',
        },
      }),
      this.prisma.reservation.count({ where }),
    ]);

    return this.buildPaginatedResponse(data, total, page, limit);
  }
}
