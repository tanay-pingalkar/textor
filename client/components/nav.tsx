import { useMediaQuery } from "react-responsive";
import { useContext, useEffect, useState } from "react";
import { Ctx } from "../context";
import MainNav from "./desktopNav";
import { useRouter } from "next/router";
import MobileNav from "./mobileNav";
import { sdk } from "../client";

type props = JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>;

const Nav: React.FC<props> = (props) => {
  const { auth, setAuth, setName } = useContext(Ctx);
  const [isMobile, setIsMobile] = useState(false);
  const query = useMediaQuery({ query: "(max-width: 545px)" });
  const router = useRouter();
  let where = "";

  useEffect(() => {
    setIsMobile(query);
  }, [query]);

  useEffect(() => {
    if (!auth) {
      (async () => {
        try {
          const { auth } = await sdk.auth();
          console.log(auth);
          if (auth.msg === "great" && auth.user) {
            setAuth(true);
            setName(auth.user.name);
          }
        } catch (error) {
          router.push("Login");
        }
      })();
    }
  }, [auth]);
  switch (router.pathname) {
    case "/":
      where = "Feed";
      break;
    case "/login":
      where = "Login";
      break;
    case "/register":
      where = "Register";
      break;
    default:
      if (router.pathname.includes("profile")) {
        where = "Profile";
      } else if (router.pathname.includes("search")) {
        where = "Search";
      } else if (router.pathname.includes("post")) {
        where = "Post ";
      } else {
        where = "Hmm";
      }

      break;
  }
  return (
    <div className="h-screen w-screen bg-white" {...props}>
      <div className="bg-gray-200 h-screen w-screen sm:w-3/4 sm:m-auto  overflow-y-auto">
        <h1 className="sm:tracking-smExtreme tracking-midExtreme font-extrabold text-3xl text-center border-white border-b-2 p-1">
          Textor
        </h1>
        {!isMobile ? (
          <MainNav where={where} auth={auth}></MainNav>
        ) : (
          <MobileNav where={where}></MobileNav>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default Nav;
