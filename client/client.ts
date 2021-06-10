import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphql";

export const client = new GraphQLClient("http://localhost:5000/graphql", {
  credentials: "include",
  headers: {
    authorization: `${process.env.BEARER}`,
  },
});
export const sdk = getSdk(client);