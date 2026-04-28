import { gql } from "@apollo/client";

export const GET_AVAILABLE_BOOKS = gql`
  query GetAvailableBooks($page: Int!, $limit: Int!) {
    availableBooks(page: $page, limit: $limit) {
      data {
        id
        title
        author
      }
      total
      page
      totalPages
    }
  }
`;
