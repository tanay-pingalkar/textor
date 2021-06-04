import { commentResponse } from "../utils/responses";
import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { commentInput } from "../utils/inputs";
import { Users } from "../entities/user";
import { Posts } from "../entities/post";
import { Comments } from "../entities/comment";
import { decodedToken, MyContext } from "../utils/types";
import jwt from "jsonwebtoken";
import { getManager } from "typeorm";
import _ from "lodash";

@Resolver()
export class commenting {
  @Mutation(() => commentResponse)
  async comment(
    @Arg("commentInfo") { postId, body, commentId }: commentInput,
    @Ctx() { req }: MyContext
  ): Promise<commentResponse> {
    let userId;
    if (req.cookies.token) {
      const obj = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ) as decodedToken;
      userId = obj.user_id;
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
      comment.children = [...comment.children, new_comment];
      await new_comment.save();
      await comment.save();
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
      await new_comment.save();
      return {
        msg: "great",
        comment: new_comment,
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
    console.log(ancestor);
    return ancestor;
  }
}

function Btree(arr: any) {
  const mapChildren = (childId) => {
    const tag = _.find(arr, (ar) => ar.id === childId) || null;
    if (_.isArray(tag.children) && tag.children.length > 0) {
      tag.children = tag.children
        .map(mapChildren)
        .filter((arr) => arr !== null);
    }
    return tag;
  };

  const btree = arr
    .filter((ar) => ar.parent === null)
    .map((ele) => {
      ele.children = ele.children.map(mapChildren);
      return ele;
    });
  return btree;
}
