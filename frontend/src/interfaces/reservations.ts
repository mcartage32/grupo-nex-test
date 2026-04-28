import type { IBook, IPaginated, IUserOption } from ".";

export interface ICreateReservationVariables {
  data: {
    userId: string;
    bookId: string;
    reservationDate: string;
    returnDate: string;
  };
}

export interface ICreateReservationResponse {
  createReservation: {
    id: string;
  };
}

export interface IReservation {
  id: string;
  book: IBook;
  user: IUserOption;
  reservationDate: string;
  returnDate: string;
  returned: boolean;
  isLate: boolean;
  lateDays: number;
  daysLeft: number;
}

export interface IAllReservationsResponse {
  allReservations: IPaginated<IReservation>;
}

export interface IReservationFilterInput {
  endDate?: string;
  startDate?: string;
}

export interface IAllReservationsVariables {
  page: number;
  limit: number;
  filter?: IReservationFilterInput;
}

export interface IReservationsByUserResponse {
  reservationsByUser: IPaginated<IReservation>;
}

export interface IReservationsByUserVariables {
  userId: string;
  page: number;
  limit: number;
  filter?: IReservationFilterInput;
}
