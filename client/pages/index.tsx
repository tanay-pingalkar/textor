import { useContext, useEffect, useState } from "react";
import Post from "../components/post";
import { Ctx } from "../context";
import { FeedResponse } from "../generated/graphql";

export default function Home() {
  const { sdk, setAuth, setUserInfo, userInfo } = useContext(Ctx);
  const [posts, setPosts] = useState<FeedResponse[]>([]);
  let token: string;

  useEffect(() => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    if (token) {
      (async () => {
        const { auth } = await sdk.auth({ token: token });

        if (auth.msg === "great" && auth.user) {
          setAuth(true);
          setUserInfo(auth.user);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (!token) {
      (async () => {
        let { feed } = await sdk.feed({
          userId: userInfo.id,
        });
        setPosts(feed as FeedResponse[]);
      })();
    }
  }, [userInfo]);
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
          ></Post>
        ))}
    </div>
  );
}
