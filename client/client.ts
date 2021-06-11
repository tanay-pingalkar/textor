import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphql";

export const client = new GraphQLClient(process.env.ENDPOINT, {
  credentials: "include",
});

export const sdk = getSdk(client);
