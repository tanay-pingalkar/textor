import { Posts } from "../entities/post";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { feedInput, postInput } from "../utils/inputs";
import { feedResponse, postResponse } from "../utils/responses";
import { Users } from "../entities/user";
import { Upvotes } from "../entities/upvote";
import { Downvotes } from "../entities/downvote";

@Resolver()
export class posts {
  @Mutation(() => postResponse)
  async post(@Arg("postInfo") postInfo: postInput): Promise<postResponse> {
    const { title, body, userId } = postInfo;

    if (title.length <= 3) {
      return {
        msg: "title should be greater than 3",
      };
    }

    if (title.length >= 20) {
      return {
        msg: "title should be less than 20",
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
  async feed(@Arg("feedInfo") feedInfo: feedInput): Promise<feedResponse[]> {
    const { userId, lastPostId } = feedInfo;
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
          .where("Posts.id < :lastPostId", { lastPostId: Number(lastPostId) })
          .where("Posts.id > :lastPostId", {
            lastPostId: Number(lastPostId) - 8,
          })
          .orderBy("Posts.totalVotes", "DESC")
          .addOrderBy("Posts.id", "DESC")
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
          .where("Posts.id < :lastPostId", { lastPostId: Number(max) })
          .where("Posts.id > :lastPostId", {
            lastPostId: Number(max) - 8,
          })
          .orderBy("Posts.totalVotes", "DESC")
          .addOrderBy("Posts.id", "DESC")
          .getMany();
      }

      for (const post of posts) {
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
      }
      return feedRes;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
