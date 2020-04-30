import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    users {
      id
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, input: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;
