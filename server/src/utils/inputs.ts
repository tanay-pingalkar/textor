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
}

@InputType()
export class commentInput {
  @Field(() => String)
  body: string;

  @Field(() => String, { nullable: true })
  commentId: string;

  @Field(() => String)
  postId: string;
}
