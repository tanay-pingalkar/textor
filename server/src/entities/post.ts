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
} from "typeorm";
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
}
