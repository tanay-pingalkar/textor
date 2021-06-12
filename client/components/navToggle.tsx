import Link from "next/link";
import React, { useContext } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { sdk } from "../client";
import { Ctx } from "../context";

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
        <div className="flex ">
          <DarkModeSwitch
            size={15}
            onChange={toggleLights}
            checked={dark}
            className="mt-3 mr-2"
          />
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
              {name + `(${reputation})`}
            </p>
          </Link>
          <p
            className="mt-3 pl-2 hover:underline "
            onClick={async () => {
              await sdk.logout();
              await fetch("/api/logout");
              setAuth(false);
            }}
          >
            logout
          </p>
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
