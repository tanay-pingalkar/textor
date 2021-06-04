import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { Downvotes } from "./downvote";
import { Posts } from "./post";
import { Upvotes } from "./upvote";
import { Users } from "./user";

@Entity()
@ObjectType()
@Tree("closure-table")
export class Comments extends BaseEntity {
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
  @Column()
  body: string;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.comments)
  user: Users;

  @Field(() => [Upvotes])
  @OneToMany(() => Upvotes, (upvote) => upvote.post)
  upvotes: Upvotes[];

  @Field(() => [Downvotes])
  @OneToMany(() => Downvotes, (downvote) => downvote.post)
  downvotes: Downvotes[];

  @Field()
  @Column({ nullable: false, type: "float", default: 0.0 })
  totalVotes: number;

  @Field(() => Posts)
  @ManyToOne(() => Posts, (post) => post.comment)
  post: Posts;

  @Field(() => [Number])
  @TreeChildren()
  children: Comments[];

  @Field(() => Number, { nullable: true })
  @TreeParent()
  parent: Comments;
}
