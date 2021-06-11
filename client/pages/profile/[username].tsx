import { GetServerSideProps } from "next";
import { sdk } from "../../client";
import { ProfileResponse } from "../../generated/graphql";
import Post from "../../components/post";

const Home: React.FC<ProfileResponse> = ({ msg, me, user }) => {
  return (
    <div>
      {msg === "great" ? (
        <>
          <div className="py-2 px-5  border-white border-b-2 flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                {user ? user.name : ""}
              </h1>
              <h1 className="text-sm">email : {user ? user.email : ""}</h1>
              <h1 className="text-sm">
                reputation : {user ? user.reputation : ""}
              </h1>
            </div>
            {me ? <button className="h-6 mt-2">edit</button> : <></>}
          </div>
          <div className="py-2 px-5  border-white border-b-2 flex">
            <p className="hover:underline text-sm">your posts</p>
          </div>
          {user.posts.map((post, key) => (
            <Post
              title={post.title}
              body={post.body}
              user={user.name}
              votes={post.totalVotes}
              upvoted={post.upvoted}
              downvoted={post.downvoted}
              key={key}
              postId={post.id}
              discussion={post.discussion}
            ></Post>
          ))}
        </>
      ) : (
        <h1>user not found</h1>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { profile } = await sdk.profile(
    {
      username: query.username as string,
    },
    {
      cookie: req.headers.cookie,
    }
  );
  return {
    props: {
      ...profile,
    },
  };
};
