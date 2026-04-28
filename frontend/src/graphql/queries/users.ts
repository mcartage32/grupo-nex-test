import { gql } from "@apollo/client";

export const GET_AVAILABLE_USERS = gql`
  query GetAvailableUsers {
    availableUsers {
      id
      email
      name
    }
  }
`;

export const GET_ALL_USERS_PAGINATED = gql`
  query GetAllUsersPaginated($page: Int!, $limit: Int!) {
    findAllUsers(page: $page, limit: $limit) {
      data {
        id
        email
        name
        isBanned
      }
      total
      page
      totalPages
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;
