import { Posts } from "../entities/post";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { postInput } from "../utils/inputs";
import { postResponse } from "../utils/responses";
import { Users } from "../entities/user";

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
  async feed() {
    const posts = await Posts.find({
      relations: ["user"],
    });

    console.log(posts);
    return posts;
  }
}
