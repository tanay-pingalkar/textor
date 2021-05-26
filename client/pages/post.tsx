import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Ctx } from "../context";
import { AUTH } from "../graphql/queries/auth";

export default function Post() {
  const { auth, userInfo, client, setAuth, setUserInfo } = useContext(Ctx);
  const router = useRouter();

  let token: string;

  useEffect(() => {
    if (!auth) {
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
          } else {
            alert("login please");
            router.push("/login");
          }
        })();
      } else {
        alert("login please");
        router.push("/login");
      }
    }
  }, [auth]);

  return <h1>Post</h1>;
}
