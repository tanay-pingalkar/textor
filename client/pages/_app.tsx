import Nav from "../components/nav";
import "../styles/global.css";
import { useState } from "react";
import { Ctx } from "../utils/context";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }): JSX.Element {
  const [auth, setAuth] = useState(false);
  const [dark, setDark] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [name, setName] = useState("");
  const [reputation, setReputation] = useState(0);
  const [last, setLast] = useState("/");

  return (
    <Ctx.Provider
      value={{
        auth,
        setAuth,
        name,
        setName,
        dark,
        setDark,
        setReputation,
        reputation,
        isMobile,
        setMobile,
        last,
        setLast,
      }}
    >
      <Nav>
        <Component {...pageProps}></Component>
      </Nav>
    </Ctx.Provider>
  );
}

export default MyApp;
