import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createSchema } from "./utils/createSchema";
import { createCon } from "./utils/createCon";
import dotenv from "dotenv";
import { MyContext, sslConfig } from "./utils/types";
import cookieParser from "cookie-parser";
import { AuthenticationError } from "apollo-server";
import cors from "cors";
import https from "https";
import http from "http";
import fs from "fs";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

(async function main() {
  await createCon();
  const configurations: sslConfig = {
    production: { ssl: true, port: PORT, hostname: process.env.CORS_ORIGIN },
    developement: { ssl: false, port: PORT, hostname: process.env.CORS_ORIGIN },
  };
  const environment = process.env.NODE_ENV || "production";

  const config = configurations[environment];
  console.log(config, environment, configurations[environment]);
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
  let httpServer;

  app.get("/", (_, res) => {
    res.send("great");
  });
  app.set("trust proxy", 1);
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

  if (config.ssl) {
    httpServer = https.createServer(
      {
        rejectUnauthorized: false,
      },
      app
    );
  } else {
    httpServer = http.createServer(app);
  }
  httpServer.listen({ port: config.port }, () => {
    console.log("🚀 Server ready");
  });
})();
