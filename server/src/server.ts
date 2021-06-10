import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createSchema } from "./utils/createSchema";
import { createCon } from "./utils/createCon";
import dotenv from "dotenv";
import { MyContext } from "./utils/types";
import cookieParser from "cookie-parser";
import { AuthenticationError } from "apollo-server";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

(async function main() {
  await createCon();
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
    context: ({ req, res }): MyContext => {
      if (req.headers.authorization !== process.env.BEARER) {
        throw new AuthenticationError("hacker quak dont hack");
      }
      return {
        req: req,
        res: res,
      };
    },
  });
  app.use(cookieParser());
  app.set("trust proxy", 1);
  server.applyMiddleware({
    app,
    cors: {
      origin: ["http://localhost:3000", "https://textor.vercel.app/"],
      credentials: true,
    },
  });
  app.get("/", (_, res) => {
    res.send("great");
  });
  app.listen(PORT, () => {
    console.log(
      `🚀 Graphql server has started\non http://localhost:${PORT}/graphql`
    );
  });
})();
