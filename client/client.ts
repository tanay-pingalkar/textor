import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/graphql";

export const client = new GraphQLClient(
  "https://textor-server.herokuapp.com/graphql" /*localhost:5000/graphq in developement*/,
  {
    credentials: "include",
  }
);

export const sdk = getSdk(client);
