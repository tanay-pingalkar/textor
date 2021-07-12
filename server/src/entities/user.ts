import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { Comments } from "./comment";
import { Downvotes, DownvotesComments } from "./downvote";
import { Posts } from "./post";
import { Upvotes, UpvotesComments } from "./upvote";

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

  @DeleteDateColumn()
  deletedAt?: Date;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => Int)
  @Column({ type: "int", default: "0" })
  reputation: number;

  @Field(() => [Posts])
  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @Field(() => [Comments])
  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @Field(() => [Upvotes])
  @OneToMany(() => Upvotes, (upvote) => upvote.user)
  upvotes: Upvotes[];

  @Field(() => [Downvotes])
  @OneToMany(() => Downvotes, (downvote) => downvote.user)
  downvotes: Downvotes[];

  @Field(() => [UpvotesComments])
  @OneToMany(() => UpvotesComments, (upvotesComment) => upvotesComment.user)
  upvotesComments: UpvotesComments[];

  @Field(() => [DownvotesComments])
  @OneToMany(
    () => DownvotesComments,
    (downvotesComment) => downvotesComment.user
  )
  downvotesComments: DownvotesComments[];
}
