import type { IPaginated, IReservation, IReservationFilterInput } from ".";

export interface IBook {
  id: string;
  title: string;
  author: string;
}

export interface IBookWithAvailability extends IBook {
  isAvailable: boolean;
}

export interface IPaginatedBooks {
  data: IBook[];
  total: number;
  page: number;
  totalPages: number;
}

export interface IGetAvailableBooksResponse {
  availableBooks: IPaginatedBooks;
}

export interface IGetAvailableBooksVariables {
  page: number;
  limit: number;
}

export interface IGetAllBooksResponse {
  findAllBooks: IPaginated<IBookWithAvailability>;
}

export interface IGetAllBooksVariables {
  page: number;
  limit: number;
}

export interface ICreateBookVariables {
  data: {
    author: string;
    title: string;
  };
}

export interface ICreateBookResponse {
  createBook: {
    id: string;
  };
}

export interface IBookDetailResponse {
  book: IBook;
}

export interface IBookDetailVariables {
  id: string;
}

export interface IReservationsByBookResponse {
  reservationsByBook: IPaginated<IReservation>;
}

export interface IReservationsByBookVariables {
  bookId: string;
  page: number;
  limit: number;
  filter?: IReservationFilterInput;
}

export interface IBooksWithoutPaginationResponse {
  booksWithoutPagination: IBook[];
}
