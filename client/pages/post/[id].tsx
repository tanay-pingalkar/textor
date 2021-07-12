import { GetServerSideProps } from "next";
import { sdk } from "../../utils/client";
import { Btree } from "../../utils/btree";
import React, { FormEvent, useContext, useState } from "react";
import Link from "next/link";
import Votes from "../../components/votes";
import { Ctree, Ptree } from "../../utils/types";
import Comment from "../../components/comment";
import { Ctx } from "../../utils/context";
import { useRouter } from "next/router";
import { Comments } from "../../generated/graphql";
import ReactMarkdown from "react-markdown";
import { syntaxComponents } from "../../utils/syntaxComponent";

interface props {
  post: Ptree;
}

const Post: React.FC<props> = ({ post }) => {
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { auth, isMobile, dark } = useContext(Ctx);
  const router = useRouter();
  const comment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth) {
      setError("*login please");
      router.push("/login");
      alert("login to comment");
    }
    if (body.trim() === "") {
      setError("*please fill the form");
    }
    try {
      const { comment } = await sdk.comment({
        body: body,
        postId: post.id,
      });
      if (comment.msg === "great" && comment.comment) {
        post.comment.unshift(comment.comment as unknown as Ctree);
        setBody("");
      } else {
        setError(`*${comment.msg}`);
      }
    } catch (error) {
      console.log(error);
      setError("oops something wrong with us");
    }
  };
  return (
    <div className="">
      <div className=" border-b-2 px-5 pt-2">
        <div className="flex justify-between">
          <h1 className="text-lg sm:text-xl font-medium">{post.title}</h1>
          <Link href={`/profile/${post.user.name}`}>
            <p className="hover:underline">posted by {post.user.name}</p>
          </Link>
        </div>

        <div className="post">
          <ReactMarkdown
            skipHtml={true}
            allowedElements={["p", "a", "code", "pre"]}
            linkTarget="_blank"
            components={syntaxComponents(dark)}
          >
            {post.body}
          </ReactMarkdown>
        </div>
        <span className="flex justify-between">
          <Votes
            Upvoted={post.upvoted}
            Downvoted={post.downvoted}
            Votes={post.totalVotes}
            postId={post.id}
          ></Votes>
          <p className="hover:underline">pin</p>
        </span>
      </div>
      <div className="mt-3 ">
        <form className="px-5" onSubmit={comment}>
          <h1>Add comment</h1>
          <textarea
            className={`${isMobile ? " w-full " : "w-80 h-24 resize"}`}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <br />
          <p className="text-red">{error}</p>
          <button>Submit</button>
        </form>

        {post.comment.map((comment) => (
          <Comment comment={comment} postId={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const postId = parseInt(query.id as string);
  const { getPost } = await sdk.getPost(
    { postId: postId },
    {
      cookie: req.headers.cookie,
    }
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  getPost.comment = Btree(getPost.comment as Comments[]) as Ctree;
  return {
    props: {
      post: getPost,
    },
  };
};
