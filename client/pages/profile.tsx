import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { sdk } from "../client";
import Post from "../components/post";
import { Ctx } from "../context";

export default function Home() {
  const { auth, userInfo, setAuth, setUserInfo } = useContext(Ctx);
  const router = useRouter();
  console.log(auth);
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
