import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { sdk } from "../utils/client";

export default function Post(): JSX.Element {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [is, setIs] = useState(false);

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
      <p className="text-red-700 mt-3 -mb-2 w-64">{error}</p>
      <button className="mt-3">submit</button>
    </form>
  );
}
