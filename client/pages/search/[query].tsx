import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { sdk } from "../../utils/client";
import { Posts } from "../../generated/graphql";
import Post from "../../components/post";

const Search: React.FC<{ search: Array<Posts> }> = ({ search }) => {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <Head>
        <title>Search</title>
        <meta
          name="description"
          content={`${search.length} results for ${router.query.query}`}
        />
        <meta
          name="twitter:card"
          content={`${search.length} results for ${router.query.query}`}
        ></meta>
      </Head>
      <div>
        {search.length !== 0 ? (
          <></>
        ) : (
          <h1 className="ml-5 mt-3">no post found</h1>
        )}
        {search.map((post, key) => (
          <Post
            title={post.title}
            body={post.body}
            user={post.user.name}
            votes={post.totalVotes}
            upvoted={post.upvoted}
            downvoted={post.downvoted}
            key={key}
            postId={post.id}
            discussion={post.discussion}
            me={post.me}
          ></Post>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { search } = await sdk.search(
    {
      query: query.query as string,
    },
    {
      cookie: req.headers.cookie,
    }
  );
  return {
    props: {
      search,
    },
  };
};

export default Search;
