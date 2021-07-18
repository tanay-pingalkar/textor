import { GetServerSideProps } from "next";
import { sdk } from "../../../utils/client";
import { ProfileResponse } from "../../../generated/graphql";
import Post from "../../../components/post";
import Head from "next/head";
import Link from "next/link";
import User from "../../../components/user";

const Home: React.FC<ProfileResponse> = ({ msg, me, user }) => {
  return (
    <>
      <Head>
        <title>
          {user.name}({user.reputation})
        </title>
        <meta name="keywords" content={user.name} />
        <meta name="author" content={user.name} />
        <meta
          name="description"
          content={`profile name : ${user.name}\nreputation : ${user.reputation}\ntotal posts : ${user.posts.length}`}
        />
        <meta
          name="twitter:card"
          content={`profile name : ${user.name}\nreputation : ${user.reputation}\ntotal posts : ${user.posts.length}`}
        ></meta>
      </Head>
      <div>
        {msg === "great" ? (
          <>
            {user ? (
              <User
                me={me}
                name={user.name}
                email={user.email}
                reputation={user.reputation}
              ></User>
            ) : (
              <></>
            )}
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
