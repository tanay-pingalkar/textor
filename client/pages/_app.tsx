import Nav from "../components/nav";
import "../styles/global.css";
import { useState } from "react";
import { Ctx } from "../context";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }): JSX.Element {
  const [auth, setAuth] = useState(false);
  const [dark, setDark] = useState(false);
  const [name, setName] = useState("");
  const [reputation, setReputation] = useState(0);

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
      }}
    >
      <Nav>
        <Component {...pageProps}></Component>
      </Nav>
    </Ctx.Provider>
  );
}

export default MyApp;
