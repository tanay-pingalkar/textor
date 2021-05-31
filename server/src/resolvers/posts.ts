import { Posts } from "../entities/post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { feedInput, postInput } from "../utils/inputs";
import { feedResponse, postResponse } from "../utils/responses";
import { Users } from "../entities/user";
import { Upvotes } from "../entities/upvote";
import { Downvotes } from "../entities/downvote";
import { MyContext } from "src/utils/types";
import jwt from "jsonwebtoken";

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

  @Query(() => [feedResponse])
  async feed(
    @Arg("feedInfo") feedInfo: feedInput,
    @Ctx() { req }: MyContext
  ): Promise<feedResponse[]> {
    const { lastPostId } = feedInfo;
    let userId;
    if (req.cookies.token) {
      const obj = jwt.verify(req.cookies.token, process.env.JWT_SECRET) as {
        user_id: string;
      };
      userId = obj.user_id;
    }

    const feedRes: feedResponse[] = [];
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
          .where("Posts.id <= :lastPostId", { lastPostId: Number(lastPostId) })
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

      for (const post of posts) {
        if (userId) {
          const isUpvoted = await Upvotes.createQueryBuilder()
            .where("Upvotes.userId = :userId", { userId: userId })
            .andWhere("Upvotes.postId = :postId", { postId: post.id })
            .getOne();

          if (isUpvoted) {
            feedRes.push({
              upvoted: true,
              downvoted: false,
              post: post,
            });
          } else {
            const isDownvoted = await Downvotes.createQueryBuilder()
              .where("Downvotes.userId = :userId", { userId: userId })
              .andWhere("Downvotes.postId = :postId", { postId: post.id })
              .getOne();

            if (isDownvoted) {
              feedRes.push({
                upvoted: false,
                downvoted: true,
                post: post,
              });
            } else {
              feedRes.push({
                upvoted: false,
                downvoted: false,
                post: post,
              });
            }
          }
        } else {
          feedRes.push({
            upvoted: false,
            downvoted: false,
            post: post,
          });
        }
      }
      return feedRes;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
