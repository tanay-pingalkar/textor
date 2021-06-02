import { Posts } from "../entities/post";
import { ObjectType, Field } from "type-graphql";
import { Users } from "../entities/user";
import { registerEnumType } from "type-graphql";

@ObjectType()
export class registerResponse {
  @Field(() => String)
  msg: string;
}

@ObjectType()
export class authResponse {
  @Field(() => String)
  msg?: string;

  @Field(() => Users, { nullable: true })
  user?: Users;
}

@ObjectType()
export class postResponse {
  @Field(() => String)
  msg?: string;

  @Field(() => Posts, { nullable: true })
  post?: Posts;
}

export enum UpvoteAction {
  UPVOTE,
  UNUPVOTE,
}

export enum DownvoteAction {
  DOWNVOTE,
  UNDOWNVOTE,
}

registerEnumType(UpvoteAction, {
  name: "UpvoteAction",
});

registerEnumType(DownvoteAction, {
  name: "DownvoteAction",
});

@ObjectType()
export class upvoteResponse {
  @Field(() => String)
  msg: string;

  @Field(() => UpvoteAction, { nullable: true })
  action?: UpvoteAction;
}

@ObjectType()
export class downvoteResponse {
  @Field(() => String)
  msg: string;

  @Field(() => DownvoteAction, { nullable: true })
  action?: DownvoteAction;
}

@ObjectType()
export class feedResponse {
  @Field(() => Boolean)
  upvoted: boolean;

  @Field(() => Boolean)
  downvoted: boolean;

  @Field(() => Posts)
  post: Posts;
}

@ObjectType()
export class profileResponse {
  @Field(() => String)
  msg: string;

  @Field(() => Boolean, { nullable: true })
  me?: boolean;

  @Field(() => Users, { nullable: true })
  user?: Users;

  @Field(() => [feedResponse], { nullable: true })
  posts?: feedResponse[];
}
