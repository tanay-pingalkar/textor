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
            <p className="mt-3 hover:underline">feed</p>
          </Link>
          <Link href="/post">
            <p className="font-light mt-3 pl-2 hover:underline ">post</p>
          </Link>
          <Link href={`/profile/${name}`}>
            <p
              className={` mt-3 pl-2 hover:underline ${(() => {
                if (name.split("").length > 7) return " w-14 truncate";
                else "";
              })()} `}
            >
              {name}
            </p>
          </Link>
          <p
            className="mt-3 pl-2 hover:underline "
            onClick={async () => {
              await sdk.logout();
              router.reload();
            }}
          >
            logout
          </p>
        </div>
      ) : (
        <div className="flex ">
          <Link href="/">
            <p className="mt-3 hover:underline">feed</p>
          </Link>
          <Link href="/login/">
            <p className=" mt-3 pl-2 hover:underline">login</p>
          </Link>
          <Link href="/register">
            <p className=" mt-3 pl-2 hover:underline">register</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavToggle;
