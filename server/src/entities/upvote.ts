import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  CreateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { Posts } from "./post";
import { Users } from "./user";

@Entity()
@ObjectType()
export class Upvotes extends BaseEntity {
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
  @ManyToOne(() => Users, (user) => user.upvotes)
  user: Users;

  @Field(() => Posts)
  @ManyToOne(() => Posts, (post) => post.upvotes)
  post: Posts;
}
