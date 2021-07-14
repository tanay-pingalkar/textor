import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Ctx } from "../utils/context";
import NavToggle from "./navToggle";

interface props {
  where: string;
  auth: boolean;
}
const MainNav: React.FC<props> = ({ where }) => {
  const router = useRouter();
  const { last } = useContext(Ctx);
  const [value, setValue] = useState(router.query.query);
  return (
    <div className="flex justify-between  border-b-2 px-5 py-1 ">
      <h1 className="font-bold text-2xl tracking-widest mt-1">{where}</h1>
      <input
        className="h-7 border-gray-900 mt-1 dark:bg-gray-100"
        placeholder="search"
        value={router.asPath.match(/search/g) ? value : ""}
        onChange={(e) => {
          if (e.target.value.trim() !== "") {
            router.replace(`/search/${e.target.value}`);
            setValue(e.target.value);
          } else {
            router.push(last);
          }
        }}
      ></input>
      <NavToggle></NavToggle>
    </div>
  );
};

export default MainNav;
