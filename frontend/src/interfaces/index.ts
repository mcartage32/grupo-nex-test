export interface IPaginated<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
