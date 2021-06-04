import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const jwtgen = (user_id: number): string => {
  const payload = {
    user_id: user_id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" });
};
