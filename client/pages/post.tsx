import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect } from "react";
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

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className=" w-24 m-5" onSubmit={formSubmit}>
      <input placeholder="title" className="pl-2 rounded-sm" />
      <textarea className=" h-48 w-64 mt-5 pl-2" placeholder="body"></textarea>
      <button className="mt-5 bg-gray-300 text-gray-800 px-2 py-1 hover:bg-black hover:text-white rounded-sm hover:underline">
        submit
      </button>
    </form>
  );
}
