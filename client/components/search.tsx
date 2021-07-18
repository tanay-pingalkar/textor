import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Ctx } from "../utils/context";

const Search = (): JSX.Element => {
  const router = useRouter();
  const { last, isMobile } = useContext(Ctx);
  const [value, setValue] = useState(router.query.query);

  return (
    <input
      className={`h-7 border-gray-900 mt-1 dark:bg-gray-100 rounded-sm pl-2 ${
        isMobile ? "w-full" : ""
      }`}
      placeholder="search"
      value={value}
      onChange={(e) => {
        if (e.target.value.trim() !== "") {
          router.replace(`/search/${e.target.value}`);
          setValue(e.target.value);
        } else {
          setValue("");
          router.push(last);
        }
      }}
    ></input>
  );
};

export default Search;
