import { useMediaQuery } from "react-responsive";
import { useContext, useEffect, useState } from "react";
import { Ctx } from "../utils/context";
import MainNav from "./desktopNav";
import { useRouter } from "next/router";
import MobileNav from "./mobileNav";
import { sdk } from "../utils/client";

type props = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

const Nav: React.FC<props> = (props) => {
  const {
    auth,
    setAuth,
    setName,
    dark,
    setDark,
    setReputation,
    setMobile,
    isMobile,
    setLast,
  } = useContext(Ctx);

  if (typeof window != "undefined") {
    const localDark = localStorage.getItem("dark");
    if (localDark === "true") {
      setDark(true);
    }
  }
  const query = useMediaQuery({ query: "(max-width: 545px)" });
  const router = useRouter();
  let where = "";

  useEffect(() => {
    setMobile(query);
  }, [query]);

  useEffect(() => {
    if (!auth) {
      (async () => {
        try {
          const { auth } = await sdk.auth();
          if (auth.msg === "great" && auth.user) {
            setAuth(true);
            setName(auth.user.name);
            setReputation(auth.user.reputation);
          }
        } catch (error) {
          // router.push("/login");
        }
      })();
    }
  }, [auth, router]);
  switch (router.pathname) {
    case "/":
      where = "Feed";
      setLast(router.asPath);
      break;
    case "/login":
      where = "Login";
      setLast(router.asPath);
      break;
    case "/register":
      where = "Register";
      setLast(router.asPath);
      break;
    default:
      if (router.pathname.includes("profile")) {
        where = "Profile";
        console.log(router.asPath);
        setLast(router.asPath);
      } else if (router.pathname.includes("search")) {
        where = "Search";
      } else if (router.pathname.includes("post")) {
        where = "Post ";
        setLast(router.asPath);
      } else {
        where = "Hmm";
      }

      break;
  }

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div
        className="w-screen h-screen  bg-white dark:bg-gray-800 overflow-y-scroll "
        {...props}
      >
        <div className="bg-gray-200 h-screen w-screen sm:w-3/4 sm:m-auto dark:bg-gray-700">
          <div>
            <h1 className="sm:tracking-smExtreme tracking-midExtreme font-extrabold text-3xl text-center border-b-2 p-1">
              Textor
            </h1>

            <div className="sticky top-0 z-500 shadow-md nav">
              {!isMobile ? (
                <MainNav where={where} auth={auth}></MainNav>
              ) : (
                <MobileNav where={where}></MobileNav>
              )}
            </div>
            {props.children}
          </div>
          <div className="sticky px-5 border-t-2 flex  py-1 justify-between top-full">
            <a
              className="font-light hover:underline dark:text-white"
              href="https://github.com/tanay-pingalkar/textor"
              rel="noreferrer"
              target="_blank"
            >
              github
            </a>
            <img src="/logo.svg" className="w-6 h-6 "></img>
            <a className="font-light hover:underline dark:text-white">
              guideline
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
