import Vote from "../svgs/vote";
import Voted from "../svgs/voted";

interface props {
  upvoted: boolean;
  downvoted: boolean;
  votes: number;
}
const Votes: React.FC<props> = ({ upvoted, downvoted, votes }) => {
  return (
    <div className="inline-flex px-3 bg-white rounded-full">
      {upvoted ? (
        <span className="mt-1">
          <Voted></Voted>
        </span>
      ) : (
        <span className="mt-1">
          <Vote></Vote>
        </span>
      )}
      <h1 className="font-rubik px-1">{votes}</h1>
      <span className="transform rotate-180 mb-1">
        {downvoted ? (
          <span className="mt-1">
            <Voted></Voted>
          </span>
        ) : (
          <Vote></Vote>
        )}
      </span>
    </div>
  );
};

export default Votes;
