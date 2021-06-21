import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createSchema } from "./utils/createSchema";
import { createCon } from "./utils/createCon";
import dotenv from "dotenv";
import { decodedToken, MyContext } from "./utils/types";
import cookieParser from "cookie-parser";
// import { AuthenticationError } from "apollo-server";
import cors from "cors";
import jwt from "jsonwebtoken";

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
      let userId: number | null = null;
      if (req.cookies.token) {
        try {
          const obj = jwt.verify(
            req.cookies.token,
            process.env.JWT_SECRET
          ) as decodedToken;
          userId = obj.user_id;
        } catch {
          //userId to be null if token not exist or is expired
        }
      }

      return {
        req: req,
        res: res,
        userId: userId,
      };
    },
  });

  app.use(cookieParser());
  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(
    cors({
      origin: [process.env.CORS_ORIGIN],
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
