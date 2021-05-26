import { gql } from "graphql-request";

export const LOGIN = gql`
  mutation login($nameOrEmail: String!, $password: String!) {
    login(loginInfo: { nameOrEmail: $nameOrEmail, password: $password }) {
      msg
      token
    }
  }
`;
