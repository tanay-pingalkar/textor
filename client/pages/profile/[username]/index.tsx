import { GetServerSideProps } from "next";
import { sdk } from "../../../utils/client";
import { ProfileResponse } from "../../../generated/graphql";
import Post from "../../../components/post";
import Head from "next/head";

const Home: React.FC<ProfileResponse> = ({ msg, me, user }) => {
  return (
    <>
      <Head>
        <title>
          {user.name}({user.reputation}) textor profile
        </title>
        <meta name="keywords" content={user.name} />
        <meta name="author" content={user.name} />
        <meta
          name="description"
          content={"profile of " + user.name + "\n" + "with " + user.reputation}
        />
      </Head>
      <div>
        {msg === "great" ? (
          <>
            <div className="py-2 px-5 border-b-2 flex justify-between">
              <div>
                <h1 className="text-2xl font-semibold">
                  {user ? user.name : ""}
                </h1>
                <h1 className="text-sm">email : {user ? user.email : ""}</h1>
                <h1 className="text-sm">
                  reputation : {user ? user.reputation : ""}
                </h1>
              </div>
              {me ? <button className="h-6 mt-2">edit</button> : <></>}
            </div>
            <div className="py-2 px-5 border-b-2 flex">
              <p className="hover:underline text-sm">your posts</p>
            </div>
            {user.posts.map((post, key) => (
              <Post
                title={post.title}
                body={post.body}
                user={user.name}
                votes={post.totalVotes}
                upvoted={post.upvoted}
                downvoted={post.downvoted}
                key={key}
                postId={post.id}
                discussion={post.discussion}
                me={me}
              ></Post>
            ))}
          </>
        ) : (
          <h1>user not found</h1>
        )}
      </div>
    </>
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
    {
      cookie: req.headers.cookie,
    }
  );
  return {
    props: {
      ...profile,
    },
  };
};
