import { GraphQLClient } from "graphql-request";
import { createContext, Dispatch, SetStateAction } from "react";
import { getSdk } from "./generated/graphql";

const client = new GraphQLClient("");
export const Ctx = createContext<{
  sdk?: ReturnType<typeof getSdk>;
  auth?: boolean;
  setAuth?: Dispatch<SetStateAction<boolean>>;
  userInfo?: any;
  setUserInfo?: Dispatch<SetStateAction<any>>;
}>({});
