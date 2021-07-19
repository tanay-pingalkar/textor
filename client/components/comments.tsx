import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import { sdk } from "../utils/client";
import { Ctx } from "../utils/context";
import { Ctree } from "../utils/types";
import Votes from "./votes";
import ReactMarkdown from "react-markdown";
import { syntaxComponents } from "../utils/syntaxComponent";

const Comment: React.FC<{ comment: Ctree; postId: string }> = ({
  comment,
  postId,
}) => {
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { auth, dark, isMobile } = useContext(Ctx);
  const [reply, setReply] = useState(false);
  const [cbody, setCbody] = useState(comment.body);
  const [edit, setEdit] = useState(false);
  const [children, setChildren] = useState(comment.children);
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
        res.comment.comment.me = true;
        setChildren([res.comment.comment as unknown as Ctree, ...children]);
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
    <div className="mt-2 ">
      <div className="px-5 pt-1 ">
        <Link href={`/profile/${comment.user.name}`}>
          <a className="hover:underline">comment by {comment.user.name}</a>
        </Link>
        {edit ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await sdk.editComment({
                commentId: Number(comment.id),
                body: cbody,
              });
              if (res.editComment.msg === "great") {
                setCbody(res.editComment.comment.body);
                setEdit(false);
              } else {
                alert(res.editComment.msg);
              }
            }}
          >
            <h1>edit</h1>
            <textarea
              value={cbody}
              className="w-full h-24"
              onChange={(e) => {
                setCbody(e.target.value);
              }}
            ></textarea>
            <button className="mb-1">submit</button>
          </form>
        ) : (
          <div className="font-rubik mdlink">
            <ReactMarkdown
              skipHtml={true}
              allowedElements={["code", "p", "a", "pre"]}
              linkTarget="_blank"
              components={syntaxComponents(dark)}
            >
              {cbody}
            </ReactMarkdown>
          </div>
        )}

        <span className="flex justify-between">
          <Votes
            Upvoted={comment.upvoted}
            Votes={comment.totalVotes}
            Downvoted={comment.downvoted}
            commentId={comment.id}
          />
          <span className="flex flex-wrap">
            {comment.me ? (
              <>
                <a onClick={() => setEdit(!edit)}>edit</a>
                <p
                  className="hover:underline ml-3"
                  onClick={async () => {
                    const sure = confirm(
                      "are you sure, you want to delete comment"
                    );
                    if (!sure) {
                      return;
                    }

                    const res = await sdk.deleteComment({
                      commentId: Number(comment.id),
                    });
                    if (res.deleteComment === "great") {
                      router.reload();
                    }
                  }}
                >
                  delete
                </p>
              </>
            ) : (
              <></>
            )}

            <p
              className="hover:underline mb-1 ml-3  "
              onClick={() => setReply(!reply)}
            >
              reply
            </p>
          </span>
        </span>

        {reply ? (
          <form className="ml-5 " onSubmit={commentIt}>
            <h1>Add comment</h1>
            <textarea
              className={`${isMobile ? " w-full" : "w-80"} h-24 resize`}
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

      {children.map((child) => (
        <div className="ml-5 border-l-2 ">
          <Comment comment={child} postId={postId} key={child.id} />
        </div>
      ))}
    </div>
  );
};

export default Comment;
