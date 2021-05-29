import { InputType, Field } from "type-graphql";

@InputType()
export class registerInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;
}

@InputType()
export class loginInput {
  @Field(() => String)
  nameOrEmail: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class postInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  userId: string;
}

@InputType()
export class voteInput {
  @Field(() => String)
  postId: string;

  @Field(() => String)
  userId: string;
}

@InputType()
export class feedInput {
  @Field(() => String)
  userId: string;

  @Field(() => String, { nullable: true })
  lastPostId: string;
}
