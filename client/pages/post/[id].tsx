import { GetServerSideProps } from "next";
import { sdk } from "../../client";
import { Comments, Posts } from "../../generated/graphql";
import _ from "lodash";
import React from "react";
import Link from "next/link";
import Votes from "../../components/votes";
type Ctree = Omit<Comments, "children"> & { children: Ctree[] };
interface props {
  post: Posts;
}
const Post: React.FC<props> = ({ post }) => {
  console.log(post);
  return (
    <div className="px-5 py-2">
      <div className="flex justify-between">
        <h1 className="text-lg sm:text-xl font-medium">{post.title}</h1>
        <Link href={`/profile/${post.user.name}`}>
          <p className="hover:underline">posted by {post.user.name}</p>
        </Link>
      </div>

      <h1 className="font-thin break-normal text-sm sm:text-base">
        {post.body}
      </h1>
      <Votes
        Upvoted={post.upvoted}
        Downvoted={post.downvoted}
        Votes={post.totalVotes}
        postId={post.id}
      ></Votes>
    </div>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const postId = parseInt(query.id as string);
  let { getPost } = await sdk.getPost({ postId: postId }, req.headers);
  getPost.comment = Btree(getPost.comment);
  return {
    props: {
      post: getPost,
    },
  };
};

function Btree(comments: Array<Comments>) {
  const mapChildren = (childId) => {
    const child = _.find(comments, (c) => Number(c.id) === childId);
    if (child.children) {
      child.children = child.children.map(mapChildren);
    }
    return child;
  };

  const btree = comments
    .filter((comment) => comment.parent === null)
    .map((comment) => {
      comment.children = comment.children.map(mapChildren);
      return comment;
    });

  return btree;
}
