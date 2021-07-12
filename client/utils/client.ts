import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/graphql";

export const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_URL /*localhost:5000/graphq in developement*/,
  {
    credentials: "include",
  }
);

export const sdk = getSdk(client);
