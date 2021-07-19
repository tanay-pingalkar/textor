import Link from "next/link";
import Votes from "./votes";
import ReactMarkdown from "react-markdown";
import { sdk } from "../utils/client";
import { useRouter } from "next/router";
import { syntaxComponents } from "../utils/syntaxComponent";
import { useContext, useState } from "react";
import { Ctx } from "../utils/context";

interface props {
  user: string;
  body: string;
  commentId: number;
  votes: number;
  upvoted: boolean;
  downvoted: boolean;
  postId: string;
  me: boolean;
}

const Post: React.FC<props> = ({
  body,
  user,
  votes,
  commentId,
  upvoted,
  downvoted,
  postId,
  me,
}) => {
  const router = useRouter();
  const { dark } = useContext(Ctx);
  const [nbody, setBody] = useState(body);
  const [edit, setEdit] = useState(false);
  return (
    <div className="px-5 pt-1 border-b-2">
      {edit ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await sdk.editComment({
              commentId: commentId,
              body: nbody,
            });
            if (res.editComment.msg === "great") {
              setBody(res.editComment.comment.body);
              setEdit(false);
            } else {
              alert(res.editComment.msg);
            }
          }}
        >
          <h1 className=" text-xl">Edit</h1>
          <textarea
            value={nbody}
            className="w-full h-24 mt-2"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <br />
          <button className="mb-1">submit</button>
        </form>
      ) : (
        <>
          <div className="flex justify-between ">
            <Link href={`/profile/${user}`}>
              <a className="hover:underline">posted by {user}</a>
            </Link>
          </div>
          <div className="post">
            <ReactMarkdown
              skipHtml={true}
              allowedElements={["p", "a", "pre", "code"]}
              linkTarget="_blank"
              components={syntaxComponents(dark)}
            >
              {nbody.slice(0, 450)}
            </ReactMarkdown>
          </div>
        </>
      )}
      {nbody.length >= 450 ? (
        <div className="mb-1">
          <Link href={`/post/${postId}`}>
            <a className="underline ">read more</a>
          </Link>
        </div>
      ) : (
        <></>
      )}

      <div className="flex justify-between w-full">
        <Votes
          Upvoted={upvoted}
          Downvoted={downvoted}
          Votes={votes}
          postId={postId}
        ></Votes>
        <div className="flex flex-wrap justify-around">
          {me ? (
            <>
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
                    const res = await sdk.deleteComment({
                      commentId: commentId,
                    });
                    if (res.deleteComment === "great") {
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
            </>
          ) : (
            <></>
          )}

          <div className="flex">
            <Link href={`/post/${postId ? postId : ""}`}>
              <a className=" hover:underline ml-3">view post</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
