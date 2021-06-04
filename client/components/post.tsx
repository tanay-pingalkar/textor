import Link from "next/link";
import Votes from "./votes";

interface props {
  user: string;
  title: string;
  body: string;
  votes: number;
  upvoted: boolean;
  downvoted: boolean;
  postId: string;
}

const Post: React.FC<props> = ({
  title,
  body,
  user,
  votes,
  upvoted,
  downvoted,
  postId,
}) => {
  return (
    <div className="px-5 pt-2 pb-1 border-b-2 border-white ">
      <div className="flex justify-between">
        <h1 className="text-lg sm:text-xl font-medium">{title}</h1>
        <Link href={`/profile/${user}`}>
          <p className="hover:underline">posted by {user}</p>
        </Link>
      </div>

      <h1 className="font-thin break-normal text-sm sm:text-base">{body}</h1>
      <div className="flex justify-between">
        <Votes
          Upvoted={upvoted}
          Downvoted={downvoted}
          Votes={votes}
          postId={postId}
        ></Votes>
        <div className="flex ">
          <p className=" hover:underline ">pin</p>
          <Link href={`/post/${postId}`}>
            <p className=" hover:underline pl-7 flex">join discussion</p>
          </Link>
          <p className="bg-black rounded-full h-4 ml-1 text-white ">32</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
