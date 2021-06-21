import { Ctree } from "./types";
import _ from "lodash";
import { Comments } from "../generated/graphql";

export function Btree(comments: Array<Comments>): Ctree {
  const mapChildren = (childId) => {
    const child = _.find(comments, (c) => Number(c.id) === childId);
    if (child.children) {
      child.children = child.children
        .reverse()
        .map(mapChildren) as unknown as number[];
    }
    return child;
  };

  const btree: Ctree = comments
    .filter((comment) => comment.parent === null)
    .reverse()
    .map((comment) => {
      comment.children = comment.children
        .reverse()
        .map(mapChildren) as unknown as number[];
      return comment;
    }) as unknown as Ctree;

  return btree;
}
