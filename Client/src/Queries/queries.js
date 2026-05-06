import { gql } from "@apollo/client";
export const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: InsertUserInpu!) {
    createUser(input: $input) {
      id
      name
      age
      username
      nationality
    }
  }
`;