import { gql } from "graphql-request";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { sdk } from "../client";
import Post from "../components/post";
import { Posts } from "../generated/graphql";

interface props {
  feed: Posts[];
}
const Home: React.FC<props> = ({ feed }) => {
  const [posts, setPosts] = useState<Posts[]>(feed);

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
          discussion={post.discussion}
        ></Post>
      ))}
      <button
        className="ml-5 mt-2 mb-2"
        onClick={async () => {
          console.log(posts[posts.length - 1].id);
          const { feed } = await sdk.feed({
            lastPostId: posts[posts.length - 1].id.toString(),
          });
          setPosts(posts.concat(feed as Posts[]));
        }}
      >
        more
      </button>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { feed } = await sdk.feed(
    {},
    {
      cookies: req.headers.cookie,
    }
  );
  return {
    props: {
      feed,
    },
  };
};
