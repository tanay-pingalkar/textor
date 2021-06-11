import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createSchema } from "./utils/createSchema";
import { createCon } from "./utils/createCon";
import dotenv from "dotenv";
import { MyContext } from "./utils/types";
import cookieParser from "cookie-parser";
// import { AuthenticationError } from "apollo-server";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

(async function main() {
  await createCon();
  const schema = await createSchema();
  const server = new ApolloServer({
    schema,
    introspection: true,
    context: ({ req, res }): MyContext => {
      // if (req.headers.authorization !== process.env.BEARER) {
      //   throw new AuthenticationError("hacker quak dont hack");
      // }
      return {
        req: req,
        res: res,
      };
    },
  });

  app.use(cookieParser());
  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  server.applyMiddleware({
    app,
    cors: false,
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
