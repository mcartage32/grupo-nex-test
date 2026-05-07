import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook($data: CreateBookInput!) {
    createBook(data: $data) {
      id
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($data: UpdateBookInput!) {
    updateBook(data: $data) {
      id
      title
      author
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: String!) {
    deleteBook(id: $id) {
      id
    }
  }
`;
