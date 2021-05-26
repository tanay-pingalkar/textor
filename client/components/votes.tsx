import Vote from "../svgs/vote";
import Voted from "../svgs/voted";

interface props {
  voted: boolean;
  votes: number;
}
const Votes: React.FC<props> = ({ voted, votes }) => {
  return (
    <div className="inline-flex px-3 bg-white rounded-full">
      {voted ? (
        <span className="mt-1">
          <Voted></Voted>
        </span>
      ) : (
        <Vote></Vote>
      )}
      <h1 className="font-rubik px-1">{votes}</h1>
      <span className="transform rotate-180 mb-1">
        <Vote></Vote>
      </span>
    </div>
  );
};

export default Votes;
