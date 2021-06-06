import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  CreateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { Comments } from "./comment";
import { Posts } from "./post";
import { Users } from "./user";

@Entity()
@ObjectType()
export class Downvotes extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date();

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.downvotes)
  user: Users;

  @Field(() => Posts)
  @ManyToOne(() => Posts, (post) => post.downvotes)
  post: Posts;
}

@Entity()
@ObjectType()
export class DownvotesComments extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date();

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.downvotesComments)
  user: Users;

  @Field(() => Comments)
  @ManyToOne(() => Comments, (comment) => comment.downvotes)
  post: Comments;
}
