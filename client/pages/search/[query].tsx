import { useRouter } from "next/router";

const Search = (): JSX.Element => {
  const router = useRouter();
  return (
    <div>
      <h1>{router.query.query}</h1>
    </div>
  );
};

export default Search;
