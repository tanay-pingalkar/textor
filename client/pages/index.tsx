import { useContext, useEffect } from "react";
import Post from "../components/post";
import { Ctx } from "../context";
import { AUTH } from "../graphql/queries/auth";

export default function Home() {
  const { client, setAuth, setUserInfo } = useContext(Ctx);
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
  }, []);
  return (
    <div>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
    </div>
  );
}
