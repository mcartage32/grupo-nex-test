// Tomar la fecha sin el "T" de UTC
export function toDateOnly(date: Date) {
  return date.toISOString().split('T')[0];
}

// Obtener la fecha actual en Colombia (UTC-5)
export function todayColombia() {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota',
  });
  return formatter.format(new Date());
}

// Validar que la fecha de reserva no sea posterior a la fecha de devolución
export function diffDays(a: string, b: string) {
  return Math.floor(
    (new Date(a).getTime() - new Date(b).getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function calculateLateReservation(reservationReturnDate: Date) {
  const today = todayColombia();
  const returnDate = toDateOnly(new Date(reservationReturnDate));
  const diffDays = Math.floor(
    (new Date(returnDate).getTime() - new Date(today).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  const isLate = diffDays < 0;

  return {
    isLate,
    lateDays: isLate ? Math.abs(diffDays) : 0,
  };
}

export function nowColombia() {
  return new Date(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Bogota',
    }).format(new Date()),
  );
}
