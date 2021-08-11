import { Posts } from "../entities/post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { postInput } from "../utils/inputs";
import { postResponse } from "../utils/responses";
import { Users } from "../entities/user";
import { MyContext } from "src/utils/types";
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

    if (title.length >= 70) {
      return {
        msg: "title should be less than 70",
      };
    }

    if (body.length > 3000) {
      return {
        msg: "your body extends the limit of 3000 words",
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

  @Mutation(() => postResponse)
  async edit(
    @Arg("postInfo") postInfo: postInput,
    @Arg("postId") postId: number,
    @Ctx() { userId }: MyContext
  ): Promise<postResponse> {
    const { title, body } = postInfo;

    if (!userId) {
      return {
        msg: "please login to post ",
      };
    }

    if (title.length <= 3) {
      return {
        msg: "title should be greater than 3",
      };
    }

    if (title.length >= 70) {
      return {
        msg: "title should be less than 70",
      };
    }

    if (body.length > 3000) {
      return {
        msg: "your body extends the limit of 3000 words",
      };
    }

    try {
      const post = await Posts.findOne(postId, {
        relations: ["user"],
      });

      if (post.user.id === userId) {
        post.title = title;
        post.body = body;
        await post.save();
        return {
          msg: "great",
          post: post,
        };
      } else {
        return {
          msg: "hacker hack dont quak",
        };
      }
    } catch (err) {
      return {
        msg: "sorry we cannot update post right now",
      };
    }
  }

  @Query(() => [Posts])
  async feed(
    @Ctx() { userId }: MyContext,
    @Arg("lastPostId", { nullable: true }) lastPostId?: string
  ): Promise<Posts[]> {
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
          .leftJoinAndMapMany(
            "Posts.comment",
            "comments",
            "c",
            "c.postId= Posts.id"
          )
          .where("Posts.id < :lastPostId", { lastPostId: Number(lastPostId) })
          .andWhere("Posts.id >= :limit", { limit: Number(lastPostId) - 20 })
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
          .leftJoinAndMapMany(
            "Posts.comment",
            "comments",
            "c",
            "c.postId= Posts.id"
          )
          .where("Posts.id <= :lastPostId", { lastPostId: Number(max) })
          .andWhere("Posts.id >= :limit", {
            limit: Number(max) - 20,
          })
          .orderBy("Posts.id", "DESC")
          .getMany();
      }
      if (userId) {
        for (const post of posts) {
          await post.isUpvoted(userId);
          await post.isDownvoted(userId);
          post.setMe(userId);
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
    @Ctx() { userId }: MyContext
  ): Promise<Posts> {
    const post = await Posts.findOne(postId, { relations: ["user"] });

    post.comment = await Comments.createQueryBuilder()
      .where("p.id = :postId", { postId: postId })
      .leftJoinAndMapOne(
        "Comments.user",
        "users",
        "u",
        "u.id = Comments.userId"
      )
      .leftJoinAndMapOne(
        "Comments.post",
        "posts",
        "p",
        "p.id = Comments.postId"
      )
      .loadRelationIdAndMap("children", "Comments.children")
      .loadRelationIdAndMap("parent", "Comments.parent")
      .getMany();

    if (userId) {
      post.setMe(userId);
      await post.isDownvoted(userId);
      await post.isUpvoted(userId);
      for (const comment of post.comment) {
        comment.setMe(userId);
        await comment.isDownvoted(userId);
        await comment.isUpvoted(userId);
      }
    }

    return post;
  }

  @Mutation(() => String)
  async delete(
    @Arg("postId") postId: number,
    @Ctx() { userId }: MyContext
  ): Promise<string> {
    try {
      const post = await Posts.findOne(postId, {
        relations: ["user"],
      });

      if (post.user.id === userId) {
        await post.softRemove();
        return "great";
      } else {
        return "you cannot delete";
      }
    } catch (err) {
      return "post not found";
    }
  }

  @Query(() => [Posts])
  async search(
    @Arg("query") query: string,
    @Ctx() { userId }: MyContext
  ): Promise<Array<Posts>> {
    try {
      const posts = await Posts.createQueryBuilder()
        .leftJoinAndMapMany(
          "Posts.comment",
          "comments",
          "c",
          "c.postId= Posts.id"
        )
        .leftJoinAndMapOne("Posts.user", "users", "u", "u.id = Posts.userId")
        .where("title ILIKE :query", { query: `%${query}%` })
        .orWhere("Posts.body ILIKE :query", { query: `%${query}%` })
        .getMany();

      if (userId) {
        for (const post of posts) {
          post.isDownvoted(userId);
          post.isUpvoted(userId);
          post.setMe(userId);
        }
      }
      return posts;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
