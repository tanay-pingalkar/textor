import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { sdk } from "../utils/client";
import { Ctx } from "../utils/context";
import Vote from "../svgs/vote";
import Voted from "../svgs/voted";

interface props {
  Upvoted: boolean;
  Downvoted: boolean;
  Votes: number;
  postId?: string;
  commentId?: string;
}
const Votes: React.FC<props> = ({
  Upvoted,
  Downvoted,
  Votes,
  postId,
  commentId,
}) => {
  const [upvoted, setUpvoted] = useState(Upvoted);
  const [downvoted, setDownvoted] = useState(Downvoted);
  const [votes, setVotes] = useState(Votes);
  const [error, setError] = useState("");

  const { auth } = useContext(Ctx);
  const router = useRouter();

  const upvote = async () => {
    if (auth) {
      setDownvoted(false);
      if (downvoted) setVotes(votes + 2);
      else if (upvoted) setVotes(votes - 1);
      else setVotes(votes + 1);
      setUpvoted(!upvoted);

      if (postId) {
        const { upvote } = await sdk.upvote({ postId: postId });

        if (upvote.msg !== "great") {
          setDownvoted(Downvoted);
          setVotes(Votes);
          setUpvoted(Upvoted);
          setError("*" + upvote.msg);
        }
      } else {
        const { upvoteComment } = await sdk.upvoteComment({
          commentId: commentId,
        });
        if (upvoteComment.msg !== "great") {
          setDownvoted(Downvoted);
          setVotes(Votes);
          setUpvoted(Upvoted);
          setError("*" + upvoteComment.msg);
        }
      }
    } else {
      router.push("/login");
      alert("login please to upvote");
    }
  };
  const downvote = async () => {
    if (auth) {
      setUpvoted(false);
      if (upvoted) setVotes(votes - 2);
      else if (downvoted) setVotes(votes + 1);
      else setVotes(votes - 1);
      setDownvoted(!downvoted);

      if (postId) {
        const { downvote } = await sdk.downvote({
          postId: postId,
        });
        if (downvote.msg !== "great") {
          setDownvoted(Downvoted);
          setVotes(Votes);
          setUpvoted(Upvoted);
          setError("*" + downvote.msg);
        }
      } else {
        const { downvoteComment } = await sdk.downvoteComment({
          commentId: commentId,
        });
        if (downvoteComment.msg !== "great") {
          setDownvoted(Downvoted);
          setVotes(Votes);
          setUpvoted(Upvoted);
          setError("*" + downvoteComment.msg);
        }
      }
    } else {
      router.push("/login");
      alert("login please to downvote");
    }
  };
  return (
    <div>
      <div className="inline-flex px-2 dark:bg-gray-200 h-5 bg-white rounded-full">
        <span className="mt-[2px]" onClick={upvote}>
          {upvoted ? <Voted></Voted> : <Vote></Vote>}
        </span>
        <h1 className="px-1 dark:text-black">{votes.toString()}</h1>
        <span className="transform rotate-180 mb-[2px]">
          <span className="" onClick={downvote}>
            {downvoted ? <Voted></Voted> : <Vote></Vote>}
          </span>
        </span>
      </div>
      <h1 className=" font-light text-xs text-red-700">{error}</h1>
    </div>
  );
};

export default Votes;
