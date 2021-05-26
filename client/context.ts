import { GraphQLClient } from "graphql-request";
import { createContext, Dispatch, SetStateAction } from "react";

export const Ctx = createContext<{
  client?: GraphQLClient;
  auth?: boolean;
  setAuth?: Dispatch<SetStateAction<boolean>>;
  userInfo?: any;
  setUserInfo?: Dispatch<SetStateAction<any>>;
}>({});
