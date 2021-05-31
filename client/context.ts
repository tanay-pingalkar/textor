import { createContext, Dispatch, SetStateAction } from "react";
import { Users } from "./generated/graphql";

export const Ctx = createContext<{
  auth?: boolean;
  setAuth?: Dispatch<SetStateAction<boolean>>;
  userInfo?: Users;
  setUserInfo?: Dispatch<SetStateAction<Users>>;
}>({});
