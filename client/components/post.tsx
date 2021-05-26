import Votes from "./votes";

const Post = () => {
  return (
    <div className="px-5 pt-2 pb-1 border-b-2 border-white">
      <div className="flex justify-between">
        <h1 className=" text-xl font-rubik font-medium">this is title</h1>
        <h1 className="text-xs font-extralight hover:underline">
          posted by lol
        </h1>
      </div>

      <h1 className=" font-rubik font-thin break-normal text-sm sm:text-base">
        an this is the content and here we go balh blah ans nancs this is cool
        bro lol dbfsdn jfkf edkfs kdnksadmksdc sd adjajflwdsfsc wfs fowc osdkjsd
        jfkds sfsd fsdoj sdofjks wcjhf uoefeijh
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
