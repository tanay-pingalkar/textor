import { Posts } from "../entities/post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { postInput } from "../utils/inputs";
import { postResponse } from "../utils/responses";
import { Users } from "../entities/user";
import { decodedToken, MyContext } from "src/utils/types";
import jwt from "jsonwebtoken";
import { Comments } from "../entities/comment";

@Resolver()
export class posts {
  @Mutation(() => postResponse)
  async post(
    @Arg("postInfo") postInfo: postInput,
    @Ctx() { req }: MyContext
  ): Promise<postResponse> {
    const { title, body } = postInfo;

    let userId;
    if (req.cookies.token) {
      try {
        const obj = jwt.verify(req.cookies.token, process.env.JWT_SECRET) as {
          user_id: string;
        };
        userId = obj.user_id;
      } catch {
        return {
          msg: "please login to post",
        };
      }
    } else {
      return {
        msg: "please login to post ",
      };
    }
    if (title.length <= 3) {
      return {
        msg: "title should be greater than 3",
      };
    }

    if (title.length >= 25) {
      return {
        msg: "title should be less than 35",
      };
    }

    if (body.length > 300) {
      return {
        msg: "your body extends the limit of 300 words",
      };
    }

    try {
      const user = await Users.findOne(userId, {
        relations: ["posts"],
      });
      if (!user) {
        return {
          msg: "user not exist",
        };
      }
      const post = Posts.create({
        title: title,
        body: body,
      });
      user.posts.unshift(post);
      await post.save();
      await user.save();

      return {
        msg: "great",
        post: post,
      };
    } catch (error) {
      console.log(error);
      return {
        msg: "unusual error",
      };
    }
  }

  @Query(() => [Posts])
  async feed(
    @Ctx() { req }: MyContext,
    @Arg("lastPostId", { nullable: true }) lastPostId?: string
  ): Promise<Posts[]> {
    let userId;
    if (req.cookies.token) {
      const obj = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ) as decodedToken;
      userId = obj.user_id;
    }
    try {
      let posts: Posts[];
      if (lastPostId) {
        posts = await Posts.createQueryBuilder()
          .leftJoinAndMapOne(
            "Posts.user",
            "users",
            "users",
            "users.id = Posts.userId"
          )
          .where("Posts.id < :lastPostId", { lastPostId: Number(lastPostId) })
          .andWhere("Posts.id >= :limit", { limit: Number(lastPostId) - 5 })
          .orderBy("Posts.id", "DESC")
          .getMany();
      } else {
        let max = await Posts.createQueryBuilder().select("MAX(ID)").execute();
        max = max[0].max;
        posts = await Posts.createQueryBuilder()
          .leftJoinAndMapOne(
            "Posts.user",
            "users",
            "users",
            "users.id = Posts.userId"
          )
          .where("Posts.id <= :lastPostId", { lastPostId: Number(max) })
          .andWhere("Posts.id >= :limit", {
            limit: Number(max) - 5,
          })
          .orderBy("Posts.id", "DESC")
          .getMany();
      }
      if (userId) {
        for (const post of posts) {
          await post.isUpvoted(userId);
          await post.isDownvoted(userId);
        }
      }
      return posts;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  @Query(() => Posts)
  async getPost(
    @Arg("postId") postId: number,
    @Ctx() { req }: MyContext
  ): Promise<Posts> {
    const post = await Posts.findOne(postId, { relations: ["user"] });

    post.comment = await Comments.createQueryBuilder()
      .leftJoinAndMapOne(
        "Comments.post",
        "posts",
        "p",
        "p.id = Comments.postId"
      )
      .loadRelationIdAndMap("children", "Comments.children")
      .loadRelationIdAndMap("parent", "Comments.parent")
      .where("p.id = :postId", { postId: postId })
      .getMany();
    let userId;

    if (req.cookies.token) {
      const obj = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ) as decodedToken;
      userId = obj.user_id;
      await post.isDownvoted(userId);
      await post.isUpvoted(userId);
    }

    return post;
  }
}
