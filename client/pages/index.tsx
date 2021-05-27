import { useContext, useEffect, useState } from "react";
import Post from "../components/post";
import { Ctx } from "../context";
import { AUTH } from "../graphql/queries/auth";
import { FEED } from "../graphql/queries/feed";

export default function Home() {
  const { client, setAuth, setUserInfo } = useContext(Ctx);
  const [posts, setPosts] = useState([]);
  let token: string;

  useEffect(() => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    if (token) {
      (async () => {
        const res = await client.request(AUTH, { token: token });
        console.log(res);
        if (res.auth.msg === "great" && res.auth.user) {
          setAuth(true);
          setUserInfo(res.auth.user);
        }
      })();
    }
    (async () => {
      const res = await client.request(FEED);
      setPosts(res.feed);
    })();
  }, []);
  return (
    <div>
      {posts.map((post, key) => (
        <Post title={post.title} body={post.body} user={post.user.name}></Post>
      ))}
    </div>
  );
}
