export * from "./books";
export * from "./reservations";
export * from "./users";

export interface IPaginated<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
