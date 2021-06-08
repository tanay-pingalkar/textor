// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Ctree } from "./types";
import _ from "lodash";

export function Btree(comments: Array<Comments>): Ctree {
  const mapChildren = (childId) => {
    const child = _.find(comments, (c) => Number(c.id) === childId);
    if (child.children) {
      child.children = child.children.reverse().map(mapChildren);
    }
    return child;
  };

  const btree = comments
    .filter((comment) => comment.parent === null)
    .map((comment) => {
      comment.children = comment.children.reverse().map(mapChildren);
      return comment;
    });

  return btree;
}
