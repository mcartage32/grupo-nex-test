import { gql } from "@apollo/client";

export const GET_ALL_RESERVATIONS = gql`
  query GetAllReservations(
    $page: Int!
    $limit: Int!
    $filter: ReservationFilterInput
  ) {
    allReservations(page: $page, limit: $limit, filter: $filter) {
      data {
        id
        book {
          id
          title
          author
        }
        user {
          id
          name
          email
        }
        reservationDate
        returnDate
        returned
        isLate
        lateDays
        daysLeft
      }
      total
      page
      totalPages
    }
  }
`;

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
