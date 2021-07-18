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
  DeleteDateColumn,
} from "typeorm";
import { DownvotesComments } from "./downvote";
import { Posts } from "./post";
import { UpvotesComments } from "./upvote";
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

  @DeleteDateColumn()
  deletedAt?: Date;

  @Field(() => String)
  @Column()
  body: string;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.comments)
  user: Users;

  @Field(() => [UpvotesComments])
  @OneToMany(() => UpvotesComments, (upvotesComment) => upvotesComment.comment)
  upvotes: UpvotesComments[];

  @Field(() => [DownvotesComments])
  @OneToMany(
    () => DownvotesComments,
    (downvoteComment) => downvoteComment.comment
  )
  downvotes: DownvotesComments[];

  @Field()
  @Column({ nullable: false, type: "float", default: 0.0 })
  totalVotes: number;

  @Field(() => Posts, { nullable: true })
  @ManyToOne(() => Posts, (post) => post.comment)
  post: Posts;

  @Field(() => [Number])
  @TreeChildren()
  children: Comments[];

  @Field(() => Number, { nullable: true })
  @TreeParent()
  parent: Comments;

  async isUpvoted(userId: number): Promise<boolean> {
    const upvote = await UpvotesComments.createQueryBuilder()
      .where("UpvotesComments.userId = :userId", { userId: userId })
      .andWhere("UpvotesComments.commentId = :postId", { postId: this.id })
      .getOne();
    this.upvoted = !!upvote;
    return !!upvote;
  }

  async isDownvoted(userId: number): Promise<boolean> {
    const downvote = await DownvotesComments.createQueryBuilder()
      .where("DownvotesComments.userId = :userId", { userId: userId })
      .andWhere("DownvotesComments.commentId = :postId", { postId: this.id })
      .getOne();
    this.downvoted = !!downvote;
    return !!downvote;
  }

  @Field(() => Boolean)
  upvoted = false;

  @Field(() => Boolean)
  downvoted = false;

  @Field(() => Boolean)
  me = false;

  setMe(userId: number): void {
    this.me = userId == this.user.id;
  }
}
