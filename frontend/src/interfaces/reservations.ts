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
