import Nav from "../components/nav";
import "../styles/global.css";
import { useState } from "react";
import { GraphQLClient } from "graphql-request";
import { Ctx } from "../context";
import { getSdk } from "../generated/graphql";

function MyApp({ Component, pageProps }) {
  const client = new GraphQLClient("http://localhost:5000/graphql");
  const sdk = getSdk(client);
  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  return (
    <Ctx.Provider
      value={{
        sdk,
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
