import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { sdk } from "../client";
import Post from "../components/post";
import { Ctx } from "../context";
import { FeedResponse } from "../generated/graphql";

interface props {
  feed: FeedResponse[];
}
const Home: React.FC<props> = ({ feed }) => {
  const [posts] = useState<FeedResponse[]>(feed);
  const { auth, setAuth, setName } = useContext(Ctx);
  useEffect(() => {
    if (!auth) {
      (async () => {
        const { auth } = await sdk.auth();

        if (auth.msg === "great" && auth.user) {
          setAuth(true);
          setName(auth.user.name);
        }
      })();
    }
  }, []);

  return (
    <div>
      {posts
        .sort((a, b) => b.post.totalVotes - a.post.totalVotes)
        .map((post, key) => (
          <Post
            title={post.post.title}
            body={post.post.body}
            user={post.post.user.name}
            votes={post.post.totalVotes}
            upvoted={post.upvoted}
            downvoted={post.downvoted}
            key={key}
            postId={post.post.id}
          ></Post>
        ))}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { feed } = await sdk.feed({}, req.headers as HeadersInit);
  return {
    props: {
      feed,
    },
  };
};
