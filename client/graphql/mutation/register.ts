import { gql } from "graphql-request";

export const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(
      registerInfo: { name: $name, email: $email, password: $password }
    ) {
      msg
      token
    }
  }
`;
