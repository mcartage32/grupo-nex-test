import { gql } from "@apollo/client";

export const GET_RESERVATIONS = gql`
  query GetAllReservations {
    allReservations {
      id
      reservationDate
      returnDate
      daysLeft
      isLate
      lateDays
      user {
        name
        email
      }
      book {
        title
        author
      }
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
