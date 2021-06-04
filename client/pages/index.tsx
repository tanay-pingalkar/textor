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
  const [posts, setPosts] = useState<FeedResponse[]>(feed);
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
      {posts.map((post, key) => (
        <Post
          title={post.title}
          body={post.body}
          user={post.user.name}
          votes={post.totalVotes}
          upvoted={post.upvoted}
          downvoted={post.downvoted}
          key={key}
          postId={post.id}
        ></Post>
      ))}
      <button
        className="ml-5 mt-2 mb-2"
        onClick={async () => {
          const { feed } = await sdk.feed({
            lastPostId: posts[posts.length - 1].id,
          });
          setPosts(posts.concat(feed as FeedResponse[]));
        }}
      >
        more
      </button>
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
