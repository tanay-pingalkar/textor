import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Post from "../components/post";
import { Ctx } from "../context";
import { AUTH } from "../graphql/queries/auth";

export default function Home() {
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

  return (
    <div>
      <div className="py-2 px-5 font-rubik border-white border-b-2 flex justify-between">
        <h1 className="text-2xl ">{userInfo.name}</h1>
        <button className=" bg-gray-300 text-gray-800 px-3 h-6 mt-1 text-xs  hover:bg-black hover:text-white rounded-sm hover:underline  ">
          edit
        </button>
      </div>
    </div>
  );
}
