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
  title: string;
  body: string;
  votes: number;
  upvoted: boolean;
  downvoted: boolean;
  postId: string;
  discussion: number;
  me: boolean;
}

const Post: React.FC<props> = ({
  title,
  body,
  user,
  votes,
  upvoted,
  downvoted,
  postId,
  discussion,
  me,
}) => {
  const router = useRouter();
  const { dark } = useContext(Ctx);
  const [ntitle, setTitle] = useState(title);
  const [nbody, setBody] = useState(body);
  const [edit, setEdit] = useState(false);
  return (
    <div className="px-5 pt-1 border-b-2  ">
      {edit ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await sdk.editPost({
              postId: Number(postId),
              title: ntitle,
              body: nbody,
            });
            if (res.edit.msg === "great") {
              setTitle(res.edit.post.title);
              setBody(res.edit.post.body);
              setEdit(false);
            } else {
              alert(res.edit.msg);
            }
          }}
        >
          <h1 className=" text-xl">Edit</h1>
          <input
            value={ntitle}
            className="w-full"
            onChange={(e) => setTitle(e.target.value)}
          ></input>{" "}
          <br />
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
            <h1 className="text-lg sm:text-xl font-medium truncate w-4/5 sm:w-10/12">
              {ntitle}
            </h1>
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
                    const res = await sdk.deletePost({
                      postId: Number(postId),
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
            </>
          ) : (
            <></>
          )}

          <div className="flex">
            <Link href={`/post/${postId}`}>
              <a className=" hover:underline ml-3">join discussion</a>
            </Link>
            <span className="bg-black rounded-full px-1 ml-1 text-[10px] h-4 text-white ">
              {discussion}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
