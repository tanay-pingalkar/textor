import { useRouter } from "next/router";
import { FormEvent, useState, useContext } from "react";
import { sdk } from "../utils/client";
import Head from "next/head";
import { Ctx } from "../utils/context";

export default function Post(): JSX.Element {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [is, setIs] = useState(false);
  const { isMobile } = useContext(Ctx);
  console.log(isMobile);

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!is) {
      setIs(true);
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
        setIs(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Textor</title>
        <meta name="description" content="post something meaningfull" />
      </Head>

      <form className=" m-5" onSubmit={formSubmit}>
        <input
          placeholder="title"
          className={`pl-2 rounded-sm ${!isMobile ? "w-64" : " w-full"}`}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          className={`h-48 ${
            !isMobile ? "w-64" : "w-full"
          } mt-5 pl-2 rounded-sm`}
          placeholder="body"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <br />
        <p className="text-red-700 mt-3 -mb-2 w-64">{error}</p>
        <button className="mt-3">submit</button>
      </form>
    </>
  );
}
