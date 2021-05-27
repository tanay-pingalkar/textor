import { gql } from "graphql-request";

export const FEED = gql`
  query feed {
    feed {
      title
      body
      user {
        name
      }
    }
  }
`;
