import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { sdk } from "../utils/client";
import Head from "next/head";

export default function Register(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() == "" || email.trim() == "" || password.trim() == "") {
      setError("*please fill the form ");
      return;
    }
    try {
      const { register } = await sdk.register({
        name: name,
        email: email,
        password,
      });
      if (register.msg === "great" && register.token) {
        await fetch("/api/save", {
          body: JSON.stringify({ token: register.token }),
          method: "POST",
        });
        router.push("/");
      } else {
        setError("*" + register.msg);
      }
    } catch (error) {
      console.log(error);
      setError("*" + error);
    }
  };

  return (
    <>
      <Head>
        <title>Textor</title>
        <meta
          name="description"
          content="register to textor and join the wonderfull community"
        />
      </Head>

      <form className="m-5 w-20" onSubmit={formSubmit}>
        <input
          placeholder="name"
          className="pl-2 "
          value={name}
          onChange={(e) => {
            setName(e.target.value.replace(/\s/g, "-"));
          }}
        />
        <input
          placeholder="email"
          className="pl-2 mt-5 "
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          className="pl-2 mt-5  "
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-700 mt-3 -mb-2 w-64">{error}</p>
        <button className="mt-5">submit</button>
      </form>
    </>
  );
}
