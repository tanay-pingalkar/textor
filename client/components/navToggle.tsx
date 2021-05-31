import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { sdk } from "../client";
import { Ctx } from "../context";

const NavToggle: React.FC = () => {
  const { auth, name } = useContext(Ctx);
  const router = useRouter();

  return (
    <>
      {auth ? (
        <div className="flex ">
          <Link href="/">
            <h1 className="font-rubik font-light text-xs mt-3 hover:underline">
              feed
            </h1>
          </Link>
          <Link href="/post">
            <h1 className="font-rubik font-light text-xs mt-3 pl-2 hover:underline ">
              post
            </h1>
          </Link>
          <Link href="/profile/">
            <h1
              className={`font-rubik font-light text-xs mt-3 pl-2 hover:underline ${(() => {
                if (name.split("").length > 7) return " w-14 truncate";
                else "";
              })()} `}
            >
              {name}
            </h1>
          </Link>
          <h1
            className="font-rubik font-light text-xs mt-3 pl-2 hover:underline "
            onClick={async () => {
              await sdk.logout();
              router.reload();
            }}
          >
            logout
          </h1>
        </div>
      ) : (
        <div className="flex ">
          <Link href="/">
            <h1 className="font-rubik font-light mt-3 text-xs hover:underline">
              feed
            </h1>
          </Link>
          <Link href="/login/">
            <h1 className="font-rubik font-light text-xs  mt-3 pl-2 hover:underline">
              login
            </h1>
          </Link>
          <Link href="/register">
            <h1 className="font-rubik font-light text-xs mt-3 pl-2  hover:underline">
              register
            </h1>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavToggle;
