import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createSchema } from "./utils/createSchema";
import { createCon } from "./utils/createCon";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

(async function main() {
  await createCon();
  const schema = await createSchema();
  const server = new ApolloServer({ schema });
  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  app.listen(PORT, () => {
    console.log(
      `🚀 Graphql server has started\non http://localhost:${PORT}/graphql`
    );
  });
})();
