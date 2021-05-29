import { voteInput } from "../utils/inputs";
import {
  DownvoteAction,
  downvoteResponse,
  UpvoteAction,
  upvoteResponse,
} from "../utils/responses";
import { Resolver, Mutation, Arg } from "type-graphql";
import { Users } from "../entities/user";
import { Posts } from "../entities/post";
import { Upvotes } from "../entities/upvote";
import { Downvotes } from "../entities/downvote";

@Resolver()
export class voting {
  /*-------------------upvote-------------------------------*/
  @Mutation(() => upvoteResponse)
  async upvote(
    @Arg("upvoteInfo") upvoteInfo: voteInput
  ): Promise<upvoteResponse> {
    const { postId, userId } = upvoteInfo;
    try {
      const user = await Users.findOne(userId, {
        relations: ["upvotes", "downvotes"],
      });
      const post = await Posts.findOne(postId, {
        relations: ["upvotes", "downvotes"],
      });

      if (!user) {
        return {
          msg: "user not found",
        };
      }

      if (!post) {
        return {
          msg: "post not found",
        };
      }

      const isUpvoted = await Upvotes.createQueryBuilder()
        .where("Upvotes.userId = :userId", { userId: userId })
        .andWhere("Upvotes.postId = :postId", { postId: postId })
        .getOne();

      const isDownvoted = await Downvotes.createQueryBuilder()
        .where("Downvotes.userId = :userId", { userId: userId })
        .andWhere("Downvotes.postId = :postId", { postId: postId })
        .getOne();

      if (isUpvoted) {
        isUpvoted.remove();
        post.totalVotes = post.totalVotes - 1;
        post.save();
        return {
          msg: "great",
          action: UpvoteAction.UNUPVOTE,
        };
      }

      if (isDownvoted) {
        isDownvoted.remove();
        post.totalVotes = post.totalVotes + 1;
      }

      const upvote = Upvotes.create();
      user.upvotes.unshift(upvote);
      post.upvotes.unshift(upvote);
      post.totalVotes = post.totalVotes + 1;

      await upvote.save();
      await user.save();
      await post.save();

      return {
        msg: "great",
        action: UpvoteAction.UPVOTE,
      };
    } catch (error) {
      console.log(error);
      return {
        msg: "an unusul error had occured",
      };
    }
  }

  /*---------------------downvote-------------------------------*/

  @Mutation(() => downvoteResponse)
  async downvote(
    @Arg("upvoteInfo") upvoteInfo: voteInput
  ): Promise<downvoteResponse> {
    const { postId, userId } = upvoteInfo;
    try {
      const user = await Users.findOne(userId, {
        relations: ["upvotes", "downvotes"],
      });
      const post = await Posts.findOne(postId, {
        relations: ["upvotes", "downvotes"],
      });

      if (!user) {
        return {
          msg: "user not found",
        };
      }

      if (!post) {
        return {
          msg: "post not found",
        };
      }

      const isUpvoted = await Upvotes.createQueryBuilder()
        .where("Upvotes.userId = :userId", { userId: userId })
        .andWhere("Upvotes.postId = :postId", { postId: postId })
        .getOne();

      const isDownvoted = await Downvotes.createQueryBuilder()
        .where("Downvotes.userId = :userId", { userId: userId })
        .andWhere("Downvotes.postId = :postId", { postId: postId })
        .getOne();

      if (isDownvoted) {
        isDownvoted.remove();
        post.totalVotes = post.totalVotes + 1;
        post.save();
        return {
          msg: "great",
          action: DownvoteAction.UNDOWNVOTE,
        };
      }

      if (isUpvoted) {
        isUpvoted.remove();
        post.totalVotes = post.totalVotes - 1;
      }

      const downvote = Downvotes.create();
      user.downvotes.unshift(downvote);
      post.downvotes.unshift(downvote);

      post.totalVotes = post.totalVotes - 1;

      await downvote.save();
      await user.save();
      await post.save();

      return {
        msg: "great",
        action: DownvoteAction.DOWNVOTE,
      };
    } catch (error) {
      console.log(error);
      return {
        msg: "an unusul error had occured",
      };
    }
  }
}
