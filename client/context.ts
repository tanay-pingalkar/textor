import { createContext, Dispatch, SetStateAction } from "react";

export const Ctx = createContext<{
  auth?: boolean;
  setAuth?: Dispatch<SetStateAction<boolean>>;
  name?: string;
  setName?: Dispatch<SetStateAction<string>>;
}>({});
