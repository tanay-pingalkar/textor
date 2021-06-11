import { gql, GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphql";

export const client = new GraphQLClient(process.env.ENDPOINT, {
  credentials: "include",
  headers: {
    authorization: `${process.env.BEARER}`,
  },
});

console.log(
  client,
  (async () =>
    await client.request(
      gql`
        {
          hello
        }
      `
    ))()
);
export const sdk = getSdk(client);
