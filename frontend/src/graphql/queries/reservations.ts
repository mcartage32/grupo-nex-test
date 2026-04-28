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

export const RESERVATIONS_BY_BOOK = gql`
  query ReservationsByBook(
    $bookId: String!
    $page: Int!
    $limit: Int!
    $filter: ReservationFilterInput
  ) {
    reservationsByBook(
      bookId: $bookId
      page: $page
      limit: $limit
      filter: $filter
    ) {
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

export const RESERVATIONS_BY_USER = gql`
  query ReservationsByUser(
    $userId: String!
    $page: Int!
    $limit: Int!
    $filter: ReservationFilterInput
  ) {
    reservationsByUser(
      userId: $userId
      page: $page
      limit: $limit
      filter: $filter
    ) {
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
