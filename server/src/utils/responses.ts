import { Posts } from "../entities/post";
import { ObjectType, Field } from "type-graphql";
import { Users } from "../entities/user";

@ObjectType()
export class registerResponse {
  @Field(() => String)
  msg: String;

  @Field(() => String, { nullable: true })
  token?: String;
}

@ObjectType()
export class authResponse {
  @Field(() => String)
  msg?: String;

  @Field(() => Users, { nullable: true })
  user?: Users;
}

@ObjectType()
export class postResponse {
  @Field(() => String)
  msg?: String;

  @Field(() => Posts, { nullable: true })
  post?: Posts;
}
