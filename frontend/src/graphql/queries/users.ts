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
