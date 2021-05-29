import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Ctx } from "../context";

const NavToggle: React.FC = () => {
  const { auth, userInfo } = useContext(Ctx);
  const router = useRouter();

  return (
    <>
      {auth ? (
        <div className="flex w-52 justify-end ">
          <Link href="/">
            <h1 className="font-rubik font-light text-xs mt-4 pl-2 hover:underline ">
              feed
            </h1>
          </Link>
          <Link href="/post">
            <h1 className="font-rubik font-light text-xs mt-4 pl-2 hover:underline ">
              post
            </h1>
          </Link>
          <Link href="/profile/">
            <h1 className="font-rubik font-light text-xs mt-4 pl-2 hover:underline truncate">
              {userInfo ? userInfo.name : ""}
            </h1>
          </Link>
          <h1
            className="font-rubik font-light text-xs mt-4 pl-2 hover:underline "
            onClick={() => {
              localStorage.removeItem("token");
              router.reload();
            }}
          >
            logout
          </h1>
        </div>
      ) : (
        <div className=" flex justify-end flex-wrap py-3">
          <Link href="/">
            <h1 className="font-rubik font-light text-xs pl-2 hover:underline">
              feed
            </h1>
          </Link>
          <Link href="/login/">
            <h1 className="font-rubik font-light text-xs  pl-2 hover:underline">
              login
            </h1>
          </Link>
          <Link href="/register">
            <h1 className="font-rubik font-light text-xs pl-2  hover:underline">
              register
            </h1>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavToggle;
