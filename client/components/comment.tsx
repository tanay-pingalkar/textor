import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import { sdk } from "../client";
import { Ctx } from "../context";
import { Ctree } from "../utils/types";
import Post from "./post";
import Votes from "./votes";

const Comment: React.FC<{ comment: Ctree; postId: string }> = ({
  comment,
  postId,
}) => {
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { auth } = useContext(Ctx);
  const [reply, setReply] = useState(false);
  const router = useRouter();
  const commentIt = async (e: FormEvent<HTMLFormElement>) => {
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
      const res = await sdk.comment({
        body: body,
        postId: postId,
        commentId: comment.id,
      });
      if (res.comment.msg === "great" && res.comment.comment) {
        comment.children.unshift(res.comment.comment as unknown as Ctree);
        setBody("");
        setReply(false);
      } else {
        setError(`*${res.comment.msg}`);
      }
    } catch (error) {
      console.log(error);
      setError("oops something wrong with us");
    }
  };
  return (
    <div className="mt-2">
      <div className="px-5 pt-1 ">
        <Link href={`/profile/${comment.user.name}`}>
          <p className="hover:underline">comment by {comment.user.name}</p>
        </Link>
        <h1 className=" break-normal text-sm mt-1 ">{comment.body}</h1>

        <Votes Upvoted={false} Votes={23} Downvoted={false} />
        <p className="hover:underline mb-1" onClick={() => setReply(!reply)}>
          reply
        </p>
        {reply ? (
          <form className="ml-5 " onSubmit={commentIt}>
            <h1>Add comment</h1>
            <textarea
              className=""
              onChange={(e) => setBody(e.target.value)}
              value={body}
            ></textarea>{" "}
            <br />
            <p className="text-red">{error}</p>
            <button>Submit</button>
          </form>
        ) : (
          <></>
        )}
      </div>

      {comment.children.map((child) => (
        <div className="ml-5 pt-1 border-white  border-l-2 ">
          <Comment comment={child} postId={postId} />
        </div>
      ))}
    </div>
  );
};

export default Comment;
