import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Comments } from "./comment";
import { Downvotes } from "./downvote";
import { Posts } from "./post";
import { Upvotes } from "./upvote";

@Entity()
@ObjectType()
export class Users extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date();

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => [Posts])
  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @Field(() => [Comments])
  @OneToMany(() => Posts, (comments) => comments.user)
  comments: Comments[];

  @Field(() => [Upvotes])
  @OneToMany(() => Upvotes, (upvote) => upvote.user)
  upvotes: Upvotes[];

  @Field(() => [Downvotes])
  @OneToMany(() => Downvotes, (downvote) => downvote.user)
  downvotes: Downvotes[];
}
