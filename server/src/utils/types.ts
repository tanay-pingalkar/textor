import { Request, Response } from "express";

export type MyContext = {
  req: Request;
  res: Response;
};

export interface decodedToken {
  user_id: number;
}

export type sslConfig = Record<
  string,
  { ssl: boolean; port: string | 5000; hostname: string }
>;
