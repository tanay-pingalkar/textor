import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import { Ctx } from "../context";
import { REGISTER } from "../graphql/mutation/register";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { client } = useContext(Ctx);
  const router = useRouter();

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() == "" || email.trim() == "" || password.trim() == "") {
      setError("*please fill the form ");
      return;
    }
    try {
      const res = await client.request(REGISTER, {
        name: name,
        email: email,
        password,
      });
      if (res.register.msg === "great" && res.register.token) {
        localStorage.setItem("token", res.register.token);
        router.push("/");
      } else {
        setError("*" + res.register.msg);
      }
    } catch (error) {
      console.log(error);
      setError("*" + error);
    }
  };

  return (
    <form className="m-5 w-20" onSubmit={formSubmit}>
      <input
        placeholder="name"
        className="pl-2 rounded-sm"
        value={name}
        onChange={(e) => {
          setName(e.target.value.replace(/\s/g, "-"));
        }}
      />
      <input
        placeholder="email"
        className="pl-2 mt-5 rounded-sm"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        className="pl-2 mt-5 rounded-sm "
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <h1 className="text-red-700 text-xs mt-3 -mb-2 w-64">{error}</h1>
      <button className="mt-5 bg-gray-300 text-gray-800 px-2 py-1 hover:bg-black hover:text-white rounded-sm hover:underline">
        submit
      </button>
    </form>
  );
}
