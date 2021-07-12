import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { Comments } from "./comment";
import { Downvotes } from "./downvote";
import { Upvotes } from "./upvote";
import { Users } from "./user";

@Entity()
@ObjectType()
export class Posts extends BaseEntity {
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
  title: string;

  @Field(() => String)
  @Column()
  body: string;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.posts)
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

  @Field(() => [Comments])
  @OneToMany(() => Comments, (comment) => comment.post)
  comment: Comments[];

  async isUpvoted(userId: number): Promise<boolean> {
    const upvote = await Upvotes.createQueryBuilder()
      .where("Upvotes.userId = :userId", { userId: userId })
      .andWhere("Upvotes.postId = :postId", { postId: this.id })
      .getOne();
    this.upvoted = !!upvote;
    return !!upvote;
  }

  async isDownvoted(userId: number): Promise<boolean> {
    const downvote = await Downvotes.createQueryBuilder()
      .where("Downvotes.userId = :userId", { userId: userId })
      .andWhere("Downvotes.postId = :postId", { postId: this.id })
      .getOne();
    this.downvoted = !!downvote;
    return !!downvote;
  }

  @Field(() => Int)
  get discussion(): number {
    return this.comment.length;
  }

  @Field(() => Boolean)
  me = false;

  setMe(userId: number): void {
    this.me = userId == this.user.id;
  }

  @Field(() => Boolean)
  upvoted = false;

  @Field(() => Boolean)
  downvoted = false;
}
