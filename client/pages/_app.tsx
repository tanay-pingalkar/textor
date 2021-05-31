import Nav from "../components/nav";
import "../styles/global.css";
import { useState } from "react";
import { Ctx } from "../context";

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  return (
    <Ctx.Provider
      value={{
        auth,
        setAuth,
        userInfo,
        setUserInfo,
      }}
    >
      <Nav>
        <Component {...pageProps}></Component>
      </Nav>
    </Ctx.Provider>
  );
}

export default MyApp;
