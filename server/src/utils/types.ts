import { Request, Response } from "express";

export type MyContext = {
  req: Request;
  res: Response;
  userId: number;
};

export interface decodedToken {
  user_id: number | null;
}
