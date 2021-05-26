import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
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
}
