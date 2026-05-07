import { BadRequestException } from '@nestjs/common';
import { toDateOnly, todayColombia } from './dates.utils.js';

export function validateDates(reservationDate: string, returnDate: string) {
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
    throw new BadRequestException('The reservation date cannot be in the past');
  }

  // validar que la fecha de devolución sea mayor a la fecha de reserva
  if (returnD <= reservation) {
    throw new BadRequestException(
      'The return date must be greater than the reservation date',
    );
  }
}
