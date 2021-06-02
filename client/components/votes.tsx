import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { sdk } from "../client";
import { Ctx } from "../context";
import Vote from "../svgs/vote";
import Voted from "../svgs/voted";

interface props {
  Upvoted: boolean;
  Downvoted: boolean;
  Votes: number;
  postId: string;
}
const Votes: React.FC<props> = ({ Upvoted, Downvoted, Votes, postId }) => {
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

      const { upvote } = await sdk.upvote({
        postId: postId,
      });
      if (upvote.msg !== "great") {
        setDownvoted(Downvoted);
        setVotes(Votes);
        setUpvoted(Upvoted);
        setError("*" + upvote.msg);
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
      router.push("/login");
      alert("login please to downvote");
    }
  };
  return (
    <div>
      <div className="inline-flex px-3 bg-white rounded-full">
        <span className="mt-1" onClick={upvote}>
          {upvoted ? <Voted></Voted> : <Vote></Vote>}
        </span>
        <h1 className="font-rubik px-1">{votes}</h1>
        <span className="transform rotate-180 mb-1">
          <span className="mt-1" onClick={downvote}>
            {downvoted ? <Voted></Voted> : <Vote></Vote>}
          </span>
        </span>
      </div>
      <h1 className=" font-light text-xs text-red-700">{error}</h1>
    </div>
  );
};

export default Votes;
