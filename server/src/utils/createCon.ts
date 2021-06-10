import { Connection, createConnection } from "typeorm";
import dotenv from "dotenv";
dotenv.config();
export const createCon = async (): Promise<Connection> => {
  const conn = await createConnection();
  await conn.runMigrations();
  return conn;
};
