import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import { sdk } from "../client";
import { Ctx } from "../context";

export default function Post() {
  const { auth, userInfo, setAuth, setUserInfo } = useContext(Ctx);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  let token: string;

  useEffect(() => {
    if (!auth) {
      (async () => {
        const { auth } = await sdk.auth();

        if (auth.msg === "great" && auth.user) {
          setAuth(true);
          setUserInfo(auth.user);
        } else {
          alert("login please");
          router.push("/login");
        }
      })();
    }
  }, [auth]);

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() == "" || body.trim() == "") {
      setError("*please fill the form ");
      return;
    }
    const res = await sdk.post({
      title: title,
      body: body,
    });
    if (res.post.msg === "great") {
      router.push("/");
    } else {
      setError("*" + res.post.msg);
    }
  };

  return (
    <form className=" w-24 m-5" onSubmit={formSubmit}>
      <input
        placeholder="title"
        className="pl-2 rounded-sm"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className=" h-48 w-64 mt-5 pl-2"
        placeholder="body"
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <h1 className="text-red-700 text-xs mt-3 -mb-2 w-64">{error}</h1>
      <button className="mt-5 bg-gray-300 text-gray-800 px-2 py-1 hover:bg-black hover:text-white rounded-sm hover:underline">
        submit
      </button>
    </form>
  );
}
