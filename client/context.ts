import { createContext, Dispatch, SetStateAction } from "react";

export const Ctx = createContext<{
  auth?: boolean;
  setAuth?: Dispatch<SetStateAction<boolean>>;
  userInfo?: any;
  setUserInfo?: Dispatch<SetStateAction<any>>;
}>({});
