import Votes from "./votes";

interface props {
  user: string;
  title: string;
  body: string;
}

const Post: React.FC<props> = ({ title, body, user }) => {
  return (
    <div className="px-5 pt-2 pb-1 border-b-2 border-white">
      <div className="flex justify-between">
        <h1 className=" text-xl font-rubik font-medium">{title}</h1>
        <h1 className="text-xs font-extralight hover:underline">
          posted by {user}
        </h1>
      </div>

      <h1 className=" font-rubik font-thin break-normal text-sm sm:text-base">
        {body}
      </h1>
      <div className="flex justify-between">
        <Votes voted={true} votes={54}></Votes>
        <div className="font-rubik font-thin flex text-xs">
          <h1 className=" hover:underline ">pin</h1>
          <h1 className=" hover:underline pl-7 flex">join discussion</h1>
          <div className="bg-black rounded-full h-4 ml-1 text-white text-xs ">
            34
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
