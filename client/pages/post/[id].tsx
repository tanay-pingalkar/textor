import { GetServerSideProps } from "next";
import { sdk } from "../../utils/client";
import { Btree } from "../../utils/btree";
import React, { FormEvent, useContext, useState } from "react";
import Link from "next/link";
import Votes from "../../components/votes";
import { Ctree, Ptree } from "../../utils/types";
import Comment from "../../components/comments";
import { Ctx } from "../../utils/context";
import { useRouter } from "next/router";
import { Comments } from "../../generated/graphql";
import ReactMarkdown from "react-markdown";
import { syntaxComponents } from "../../utils/syntaxComponent";
import Head from "next/head";

interface props {
  post: Ptree;
}

const Post: React.FC<props> = ({ post }) => {
  const [nbody, setNbody] = useState(post.body);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { auth, isMobile, dark } = useContext(Ctx);
  const router = useRouter();
  const [comments, setComments] = useState(post.comment);
  const [edit, setEdit] = useState(false);

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
        // com.unshift(comment.comment as unknown as Ctree);
        comment.comment.me = true;
        setComments([comment.comment as unknown as Ctree, ...comments]);
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
    <>
      <Head>
        <title>Textor</title>
        <meta name="keywords" content={post.body} />
        <meta name="author" content={post.user.name} />
        <meta
          name="description"
          content={`title : ${post.title}\n upvotes : ${post.totalVotes}\n comments : ${post.discussion}`}
        />
        <meta
          name="twitter:card"
          content={`title : ${post.title}\n upvotes : ${post.totalVotes}\n comments : ${post.discussion}`}
        />
        <meta property="og:title" content="Textor" />
        <meta
          property="og:description"
          content={`title : ${post.title}\n upvotes : ${post.totalVotes}\n comments : ${post.discussion}`}
        />
      </Head>
      <div className="">
        <div className=" border-b-2 px-5 pt-2">
          {edit ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await sdk.editPost({
                  postId: Number(post.id),
                  title: title,
                  body: nbody,
                });
                if (res.edit.msg === "great") {
                  setTitle(res.edit.post.title);
                  setNbody(res.edit.post.body);
                  setEdit(false);
                } else {
                  alert(res.edit.msg);
                }
              }}
            >
              <h1 className=" text-xl">Edit</h1>
              <input
                value={title}
                className="w-full"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <br />
              <textarea
                value={nbody}
                className="w-full h-24 mt-2"
                onChange={(e) => setNbody(e.target.value)}
              ></textarea>
              <br />
              <button className="mb-1">submit</button>
            </form>
          ) : (
            <>
              <div className="flex justify-between">
                <h1 className="text-lg sm:text-xl font-medium w-full break-all">
                  {title}
                </h1>
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
                  {nbody}
                </ReactMarkdown>
              </div>
            </>
          )}

         
            {/* <Votes
              Upvoted={post.upvoted}
              Downvoted={post.downvoted}
              Votes={post.totalVotes}
              postId={post.id}
            ></Votes> */}
             
            {post.me ? (
               <span className="flex justify-between">
              <div className="p-3"></div>
              <div className="flex flex-wrap">
                <a
                  className=" hover:underline ml-3"
                  onClick={() => setEdit(!edit)}
                >
                  edit
                </a>
                <a
                  className=" hover:underline ml-3"
                  onClick={async () => {
                    const con = confirm("are you sure");
                    if (!con) {
                      return;
                    }
                    try {
                      const res = await sdk.deletePost({
                        postId: Number(post.id),
                      });
                      if (res.delete === "great") {
                        router.reload();
                      } else {
                        alert("sorry cannot delete");
                      }
                    } catch (err) {
                      console.log(err);
                      alert("unusual error");
                    }
                  }}
                >
                  delete
                </a>
              </div>
              </span>
            ) : (
              <div className="p-1"></div>
            )}
         
        </div>
        <div className="mt-3 ">
          <form className="px-5" onSubmit={comment}>
            <h1>Add comment</h1>
            <textarea
              value={body}
              className={`${isMobile ? " w-full" : "w-80"} h-24 resize `}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <br />
            <p className="text-red">{error}</p>
            <button>Submit</button>
          </form>
          {comments.map((comment) => (
            <Comment
              postId={post.id}
              comment={comment}
              key={comment.id}
            ></Comment>
          ))}
        </div>
      </div>
    </>
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
