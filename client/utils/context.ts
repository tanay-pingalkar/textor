import { createContext, Dispatch, SetStateAction } from "react";

export const Ctx = createContext<{
  auth?: boolean;
  setAuth?: Dispatch<SetStateAction<boolean>>;
  name?: string;
  setName?: Dispatch<SetStateAction<string>>;
  reputation?: number;
  setReputation?: Dispatch<SetStateAction<number>>;
  dark?: boolean;
  setDark?: Dispatch<SetStateAction<boolean>>;
  isMobile?: boolean;
  setMobile?: Dispatch<SetStateAction<boolean>>;
}>({});
