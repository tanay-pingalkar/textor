import Nav from "../components/nav";
import "../styles/global.css";
import { useState } from "react";
import { Ctx } from "../context";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }): JSX.Element {
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
