import { gql } from "@apollo/client";

export const GET_RESERVATIONS = gql`
  query {
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
