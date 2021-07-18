import { GetServerSideProps } from "next";
import { sdk } from "../../../utils/client";
import { ProfileWithCommentsQuery } from "../../../generated/graphql";
import Comment from "../../../components/comment";
import User from "../../../components/user";
import Head from "next/head";

const Home: React.FC<ProfileWithCommentsQuery> = ({
  profile: { msg, me, user },
}) => {
  return (
    <>
      <Head>
        <title>
          {user.name}({user.reputation})
        </title>
        <meta name="keywords" content={user.name} />
        <meta name="author" content={user.name} />
        <meta
          name="description"
          content={`profile name : ${user.name}\nreputation : ${user.reputation}\ntotal comments : ${user.comments.length}`}
        />
        <meta
          name="twitter:card"
          content={`profile name : ${user.name}\nreputation : ${user.reputation}\ntotal comments : ${user.comments.length}`}
        ></meta>
      </Head>
      <div>
        {msg === "great" ? (
          <>
            {user ? (
              <User
                me={me}
                name={user.name}
                email={user.email}
                reputation={user.reputation}
              ></User>
            ) : (
              <></>
            )}
            <div>
              {user.comments.map((comment) => (
                <Comment
                  commentId={Number(comment.id)}
                  body={comment.body}
                  upvoted={comment.upvoted}
                  downvoted={comment.downvoted}
                  votes={comment.totalVotes}
                  postId={comment.post ? comment.post.id : null}
                  me={true}
                  user={user.name}
                ></Comment>
              ))}
            </div>
          </>
        ) : (
          <h1>user not found</h1>
        )}
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const res = await sdk.profileWithComments(
    {
      username: query.username as string,
    },
    {
      cookie: req.headers.cookie,
    }
  );
  return {
    props: {
      ...res,
    },
  };
};
