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
