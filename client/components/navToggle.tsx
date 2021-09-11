import Link from "next/link";
import React, { useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { sdk } from "../utils/client";
import { Ctx } from "../utils/context";

const NavToggle: React.FC = () => {
  const { auth, name, setDark, dark, reputation, setAuth } = useContext(Ctx);

  const toggleLights = () => {
    setDark(!dark);
    if (localStorage.getItem("dark") === "false") {
      localStorage.setItem("dark", "true");
    } else {
      localStorage.setItem("dark", "false");
    }
  };
  return (
    <>
      {auth ? (
        <div className="flex flex-wrap justify-around">
          <DarkModeSwitch
            size={15}
            onChange={toggleLights}
            checked={dark}
            className="mt-3 mr-2"
          />
          <Link href="/">
            <a className="mt-3 hover:underline">feed</a>
          </Link>
          <Link href="/post">
            <a className="font-light mt-3 pl-2 hover:underline ">post</a>
          </Link>
          <Link href={`/profile/${name}`}>
            <a
              className={` mt-3 pl-2 hover:underline ${(() => {
                if (name.split("").length > 7) return " w-14 truncate";
                else "";
              })()} `}
            >
              {name}
            </a>
          </Link>
          <a
            className="mt-3 pl-2 hover:underline "
            onClick={async () => {
              await sdk.logout();
              await fetch("/api/logout");
              setAuth(false);
            }}
          >
            logout
          </a>
        </div>
      ) : (
        <div className="flex ">
          <DarkModeSwitch
            size={15}
            onChange={toggleLights}
            checked={dark}
            className="mt-3 mr-2"
          />
          <Link href="/">
            <a className="mt-3 hover:underline">feed</a>
          </Link>
          <Link href="/login/">
            <a className=" mt-3 pl-2 hover:underline">login</a>
          </Link>
          <Link href="/register">
            <a className=" mt-3 pl-2 hover:underline">register</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default NavToggle;
