import { Connection, createConnection } from "typeorm";
import dotenv from "dotenv";
import { Users } from "../entities/user";
import { Posts } from "../entities/post";
import { Upvotes } from "../entities/upvote";
import { Downvotes } from "../entities/downvote";
import { Comments } from "../entities/comment";

dotenv.config();
export const createCon = async (): Promise<Connection> => {
  return await createConnection({
    type: "postgres",
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST || "localhost",
    entities: [Users, Posts, Upvotes, Downvotes, Comments],
    synchronize: true,
  });
};
