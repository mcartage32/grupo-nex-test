import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
  mutation CreateReservation($data: CreateReservationInput!) {
    createReservation(data: $data) {
      id
    }
  }
`;

export const RETURN_BOOK = gql`
  mutation ReturnBook($id: String!) {
    returnBook(reservationId: $id) {
      id
    }
  }
`;
