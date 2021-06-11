import {
  DownvoteAction,
  downvoteResponse,
  UpvoteAction,
  upvoteResponse,
} from "../utils/responses";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Users } from "../entities/user";
import { Posts } from "../entities/post";
import { Upvotes, UpvotesComments } from "../entities/upvote";
import { Downvotes, DownvotesComments } from "../entities/downvote";
import { decodedToken, MyContext } from "../utils/types";
import jwt from "jsonwebtoken";
import { Comments } from "../entities/comment";

@Resolver()
export class voting {
  /*-------------------upvote-------------------------------*/
  @Mutation(() => upvoteResponse)
  async upvote(
    @Arg("postId") postId: string,
    @Ctx() { req }: MyContext
  ): Promise<upvoteResponse> {
    let userId;
    if (req.cookies.token) {
      const obj = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ) as decodedToken;
      userId = obj.user_id;
    } else {
      return {
        msg: "user not exists",
      };
    }

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
        user.reputation -= 1;
        post.save();
        return {
          msg: "great",
          action: UpvoteAction.UNUPVOTE,
        };
      }

      if (isDownvoted) {
        isDownvoted.remove();
        post.totalVotes = post.totalVotes + 1;
        user.reputation += 1;
      }

      const upvote = Upvotes.create();
      user.upvotes.unshift(upvote);
      post.upvotes.unshift(upvote);
      post.totalVotes = post.totalVotes + 1;
      user.reputation += 1;

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
    @Arg("postId") postId: string,
    @Ctx() { req }: MyContext
  ): Promise<downvoteResponse> {
    let userId;
    if (req.cookies.token) {
      const obj = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ) as decodedToken;
      userId = obj.user_id;
    } else {
      return {
        msg: "user not exists",
      };
    }
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
        user.reputation += 1;
        post.save();
        return {
          msg: "great",
          action: DownvoteAction.UNDOWNVOTE,
        };
      }

      if (isUpvoted) {
        isUpvoted.remove();
        post.totalVotes = post.totalVotes - 1;
        user.reputation -= 1;
      }

      const downvote = Downvotes.create();
      user.downvotes.unshift(downvote);
      post.downvotes.unshift(downvote);

      post.totalVotes = post.totalVotes - 1;
      user.reputation -= 1;

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

  /*--------------------upvoting-comment------------------*/
  @Mutation(() => upvoteResponse)
  async upvoteComment(
    @Arg("commentId") commentId: string,
    @Ctx() { req }: MyContext
  ): Promise<upvoteResponse> {
    let userId;
    if (req.cookies.token) {
      const obj = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ) as decodedToken;
      userId = obj.user_id;
    } else {
      return {
        msg: "user not exists",
      };
    }

    try {
      const user = await Users.findOne(userId, {
        relations: ["upvotesComments", "downvotesComments"],
      });

      const comment = await Comments.findOne(commentId, {
        relations: ["upvotes", "downvotes"],
      });

      if (!user) {
        return {
          msg: "user not found",
        };
      }

      if (!comment) {
        return {
          msg: "post not found",
        };
      }
      const isUpvoted = await UpvotesComments.createQueryBuilder()
        .where("UpvotesComments.userId = :userId", { userId: userId })
        .andWhere("UpvotesComments.commentId = :commentId", {
          commentId: commentId,
        })
        .getOne();

      const isDownvoted = await DownvotesComments.createQueryBuilder()
        .where("DownvotesComments.userId = :userId", { userId: userId })
        .andWhere("DownvotesComments.commentId = :commentId", {
          commentId: commentId,
        })
        .getOne();

      if (isUpvoted) {
        await isUpvoted.remove();
        comment.totalVotes = comment.totalVotes - 1;
        user.reputation -= 1;
        await comment.save();
        return {
          msg: "great",
          action: UpvoteAction.UNUPVOTE,
        };
      }

      if (isDownvoted) {
        await isDownvoted.remove();
        comment.totalVotes = comment.totalVotes + 1;
        user.reputation += 1;
      }

      const upvote = UpvotesComments.create();
      user.upvotesComments.unshift(upvote);
      comment.upvotes.unshift(upvote);
      comment.totalVotes = comment.totalVotes + 1;
      user.reputation += 1;

      await upvote.save();
      await user.save();
      await comment.save();

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

  /*------------------downvoting-comment--------------*/
  @Mutation(() => downvoteResponse)
  async downvoteComment(
    @Ctx() { req }: MyContext,
    @Arg("commentId") commentId: string
  ): Promise<downvoteResponse> {
    let userId;
    if (req.cookies.token) {
      const obj = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ) as decodedToken;
      userId = obj.user_id;
    } else {
      return {
        msg: "user not exists",
      };
    }
    try {
      const user = await Users.findOne(userId, {
        relations: ["upvotesComments", "downvotesComments"],
      });
      const comment = await Comments.findOne(commentId, {
        relations: ["upvotes", "downvotes"],
      });

      if (!user) {
        return {
          msg: "user not found",
        };
      }

      if (!comment) {
        return {
          msg: "post not found",
        };
      }

      const isUpvoted = await UpvotesComments.createQueryBuilder()
        .where("UpvotesComments.userId = :userId", { userId: userId })
        .andWhere("UpvotesComments.commentId = :postId", { postId: commentId })
        .getOne();

      const isDownvoted = await DownvotesComments.createQueryBuilder()
        .where("DownvotesComments.userId = :userId", { userId: userId })
        .andWhere("DownvotesComments.commentId = :postId", {
          postId: commentId,
        })
        .getOne();

      if (isDownvoted) {
        await isDownvoted.remove();
        comment.totalVotes = comment.totalVotes + 1;
        user.reputation += 1;
        comment.save();
        return {
          msg: "great",
          action: DownvoteAction.UNDOWNVOTE,
        };
      }

      if (isUpvoted) {
        await isUpvoted.remove();
        comment.totalVotes = comment.totalVotes - 1;
        user.reputation -= 1;
      }

      const downvote = DownvotesComments.create();
      user.downvotesComments.unshift(downvote);
      comment.downvotes.unshift(downvote);

      comment.totalVotes = comment.totalVotes - 1;
      user.reputation -= 1;

      await downvote.save();
      await user.save();
      await comment.save();

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
