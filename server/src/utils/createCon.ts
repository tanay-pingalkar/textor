import { Connection, createConnection } from "typeorm";
import dotenv from "dotenv";
import { Users } from "../entities/user";
import { Posts } from "../entities/post";

dotenv.config();
export const createCon = async (): Promise<Connection> => {
  return await createConnection({
    type: "postgres",
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST || "localhost",
    entities: [Users, Posts],
    synchronize: true,
  });
};
