import { useContext, useEffect, useState } from "react";
import Post from "../components/post";
import { Ctx } from "../context";

export default function Home() {
  const { sdk, setAuth, setUserInfo } = useContext(Ctx);
  const [posts, setPosts] = useState([]);
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
    (async () => {
      const { feed } = await sdk.feed();
      setPosts(feed);
    })();
  }, []);
  return (
    <div>
      {posts.map((post, key) => (
        <Post
          title={post.title}
          body={post.body}
          user={post.user.name}
          key={key}
        ></Post>
      ))}
    </div>
  );
}
