import { commentResponse } from "../utils/responses";
import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { commentInput } from "../utils/inputs";
import { Users } from "../entities/user";
import { Posts } from "../entities/post";
import { Comments } from "../entities/comment";
import { MyContext } from "../utils/types";
import { getManager } from "typeorm";

@Resolver()
export class commenting {
  @Mutation(() => commentResponse)
  async comment(
    @Arg("commentInfo") { postId, body, commentId }: commentInput,
    @Ctx() { userId }: MyContext
  ): Promise<commentResponse> {
    if (body.trim().length === 0) {
      return {
        msg: "comment should have some content",
      };
    }

    if (!userId) {
      return {
        msg: "login please",
      };
    }

    const user = await Users.findOne(userId);

    if (!user) {
      return {
        msg: "user not exist",
      };
    }

    const post = await Posts.findOne(postId);

    if (!user) {
      return {
        msg: "post not exist",
      };
    }

    if (commentId) {
      const comment = await Comments.findOne(commentId, {
        relations: ["children"],
      });
      if (!comment) {
        return {
          msg: "no comment exist",
        };
      }

      const new_comment = Comments.create({
        body: body,
      });
      new_comment.user = user;
      new_comment.post = post;
      new_comment.parent = comment;
      new_comment.children = [];
      comment.children.unshift(new_comment);
      await new_comment.save();
      await comment.save();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      new_comment.parent = comment.id;
      return {
        msg: "great",
        comment: new_comment,
      };
    } else {
      const new_comment = Comments.create({
        body: body,
      });
      new_comment.user = user;
      new_comment.post = post;
      new_comment.children = [];
      await new_comment.save();
      return {
        msg: "great",
        comment: new_comment,
      };
    }
  }

  @Mutation(() => commentResponse)
  async editComment(
    @Arg("body") body: string,
    @Arg("commentId") commentId: number,
    @Ctx() { userId }: MyContext
  ): Promise<commentResponse> {
    if (body.trim().length === 0) {
      return {
        msg: "comment should have some content",
      };
    }

    try {
      const comments = getManager().getTreeRepository(Comments);
      const comment = await comments.findOne(commentId, {
        relations: ["user"],
      });
      if (comment) {
        if (comment.user.id === userId) {
          comment.body = body;
          await comment.save();
          return {
            msg: "great",
            comment: comment,
          };
        } else {
          return {
            msg: "you dont have permission",
          };
        }
      } else {
        return {
          msg: "comment not exist",
        };
      }
    } catch (err) {
      return {
        msg: "cannot find comment",
      };
    }
  }

  @Query(() => [Comments])
  async thread(@Arg("postId") postId: number): Promise<Comments[]> {
    const comments = getManager().getTreeRepository(Comments);
    const ancestor = await comments
      .createQueryBuilder()
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
    return ancestor;
  }

  @Mutation(() => String)
  async deleteComment(
    @Arg("commentId") postId: number,
    @Ctx() { userId }: MyContext
  ): Promise<string> {
    const comment = await Comments.findOne(postId, {
      relations: ["user"],
    });

    if (comment.user.id === userId) {
      await comment.softRemove();
      return "great";
    } else {
      return "you cannot delete";
    }
  }
}
