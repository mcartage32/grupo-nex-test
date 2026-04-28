export interface IBook {
  id: string;
  title: string;
  author: string;
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
