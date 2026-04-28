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

export const GET_ALL_BOOKS = gql`
  query GetAllBooks($page: Int!, $limit: Int!) {
    findAllBooks(page: $page, limit: $limit) {
      data {
        id
        title
        author
        isAvailable
      }
      total
      page
      totalPages
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($data: CreateBookInput!) {
    createBook(data: $data) {
      id
    }
  }
`;

export const BOOK_DETAIL = gql`
  query BookDetail($id: String!) {
    book(id: $id) {
      id
      title
      author
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
