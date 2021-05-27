import { gql } from "graphql-request";

export const HELLO = gql`
  query hello {
    hello
  }
`;
