import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReservationInput } from './dto/create-reservation.input.js';
import { Prisma } from '../generated/prisma/client.js';
import { ReservationFilterInput } from './dto/reservation-filters.input.js';
import { FindManyReservationsArgs } from './dto/find-many-reservation.args.js';

function toDateOnly(date: Date) {
  return date.toISOString().split('T')[0];
}

function todayColombia() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota',
  });
  return formatter.format(new Date());
}

function diffDays(a: string, b: string) {
  return Math.floor(
    (new Date(a).getTime() - new Date(b).getTime()) / (1000 * 60 * 60 * 24),
  );
}

function getReservationMeta(reservation: any) {
  const today = todayColombia();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const returnDate = toDateOnly(new Date(reservation.returnDate));
  const daysLeft = diffDays(returnDate, today);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...reservation,
    daysLeft,
    isLate: daysLeft < 0,
    lateDays: daysLeft < 0 ? Math.abs(daysLeft) : 0,
  };
}

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReservationInput) {
    const { userId, bookId, returnDate, reservationDate } = data;

    // validar que el usuario no esté baneado por reservas vencidas
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (user?.isBanned) {
      throw new BadRequestException(
        'User is banned due to overdue reservations',
      );
    }

    // validar que el libro no tenga reserva activa
    const activeReservation = await this.prisma.reservation.findFirst({
      where: {
        bookId,
        returned: false,
      },
    });

    if (activeReservation) {
      throw new BadRequestException('This book is already reserved');
    }

    // validar máximo 3 reservas activas por usuario
    const userReservations = await this.prisma.reservation.count({
      where: {
        userId,
        returned: false,
      },
    });

    if (userReservations >= 3) {
      throw new BadRequestException('This user already has 3 books reserved');
    }

    const reservation = toDateOnly(new Date(reservationDate));
    const returnD = toDateOnly(new Date(returnDate));
    const today = todayColombia();

    // validar que la fecha de devolución sea futura (no se puede hoy)
    if (returnD <= today) {
      throw new BadRequestException(
        'The return date must be greater than the current date',
      );
    }

    // validar que la fecha de reserva no sea en el pasado
    if (reservation < today) {
      throw new BadRequestException(
        'The reservation date cannot be in the past',
      );
    }

    // validar que la fecha de devolución sea mayor a la fecha de reserva
    if (returnD <= reservation) {
      throw new BadRequestException(
        'The return date must be greater than the reservation date',
      );
    }
    // crear reserva
    return this.prisma.reservation.create({
      data: {
        userId,
        bookId,
        returnDate,
        reservationDate,
      },
      include: {
        book: true,
        user: true,
      },
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

    const today = todayColombia();
    const returnDate = toDateOnly(new Date(reservation.returnDate));
    const diffDays = Math.floor(
      (new Date(returnDate).getTime() - new Date(today).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    const isLate = diffDays < 0;
    const lateDays = isLate ? Math.abs(diffDays) : 0;

    const updated = await this.prisma.reservation.update({
      where: { id: reservationId },
      data: {
        returned: true,
        returnedAt: new Date(
          new Intl.DateTimeFormat('en-CA', {
            timeZone: 'America/Bogota',
          }).format(new Date()),
        ),
      },
      include: { book: true, user: true },
    });

    if (isLate) {
      await this.prisma.user.update({
        where: { id: reservation.userId },
        data: {
          isBanned: true,
        },
      });
    }

    return {
      ...updated,
      isLate,
      lateDays,
    };
  }

  // Reservas por libro
  async reservationsByBook(bookId: string, filter?: ReservationFilterInput) {
    const where: Prisma.ReservationWhereInput = {
      bookId,
      reservationDate: {
        gte: filter?.startDate,
        lte: filter?.endDate,
      },
    };

    return (
      this.prisma.reservation
        .findMany({
          where,
          include: {
            user: true,
            book: true,
          },
          orderBy: {
            reservationDate: 'desc',
          },
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .then((data) => data.map(getReservationMeta))
    );
  }

  // Reservas por usuario
  async reservationsByUser(userId: string, filter?: ReservationFilterInput) {
    const where: Prisma.ReservationWhereInput = {
      userId,
      reservationDate: {
        gte: filter?.startDate,
        lte: filter?.endDate,
      },
    };

    return (
      this.prisma.reservation
        .findMany({
          where,
          include: {
            book: true,
            user: true,
          },
          orderBy: {
            reservationDate: 'desc',
          },
        })
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .then((data) => data.map(getReservationMeta))
    );
  }

  async allReservations(args: FindManyReservationsArgs) {
    const page = args.page ?? 1;
    const limit = args.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.ReservationWhereInput = {
      reservationDate: {
        gte: args.filter?.startDate,
        lte: args.filter?.endDate,
      },
    };

    const [data, total] = await Promise.all([
      this.prisma.reservation.findMany({
        where,
        skip,
        take: limit,
        include: {
          book: true,
          user: true,
        },
        orderBy: {
          reservationDate: 'desc',
        },
      }),
      this.prisma.reservation.count({ where }),
    ]);

    return {
      data: data.map(getReservationMeta),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
