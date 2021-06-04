import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { hello } from "../resolvers/hello";
import { users } from "../resolvers/user";
import { posts } from "../resolvers/posts";
import { voting } from "../resolvers/voting";
import { commenting } from "../resolvers/commenting";

export const createSchema = async (): Promise<GraphQLSchema> => {
  return await buildSchema({
    resolvers: [hello, users, posts, voting, commenting],
  });
};
