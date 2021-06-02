import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { sdk } from "../../client";
import { Ctx } from "../../context";
import { ProfileResponse } from "../../generated/graphql";
import Post from "../../components/post";

const Home: React.FC<ProfileResponse> = ({ msg, me, user, posts }) => {
  const { auth, setAuth, setName } = useContext(Ctx);

  const router = useRouter();
  console.log(msg);

  useEffect(() => {
    if (msg === "no user id provide, login please") {
      alert(msg);
      router.push("/login");
    } else if (!auth) {
      (async () => {
        const { auth } = await sdk.auth();

        if (auth.msg === "great" && auth.user) {
          setAuth(true);
          setName(auth.user.name);
        }
      })();
    }
  }, [auth]);

  return (
    <div>
      {msg === "great" ? (
        <>
          <div className="py-2 px-5 font-rubik border-white border-b-2 flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                {user ? user.name : ""}
              </h1>
              <h1 className="text-sm">email : {user ? user.email : ""}</h1>
              <h1 className="text-sm">points : 5</h1>
            </div>
            {me ? (
              <button className=" bg-gray-300 text-gray-800 px-3 h-6 mt-1 text-xs  hover:bg-black hover:text-white rounded-sm hover:underline  ">
                edit
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="py-2 px-5 font-rubik border-white border-b-2 flex">
            <h1 className=" text-xs font-light hover:underline">your posts</h1>
          </div>
          {posts.map((post, key) => (
            <Post
              title={post.post.title}
              body={post.post.body}
              user={user.name}
              votes={post.post.totalVotes}
              upvoted={post.upvoted}
              downvoted={post.downvoted}
              key={key}
              postId={post.post.id}
            ></Post>
          ))}
        </>
      ) : (
        <h1>user not found</h1>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { profile } = await sdk.profile(
    {
      username: query.username as string,
    },
    req.headers as HeadersInit
  );
  return {
    props: {
      ...profile,
    },
  };
};
