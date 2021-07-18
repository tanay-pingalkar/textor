import Link from "next/link";

interface props {
  me: boolean;
  name: string;
  email: string;
  reputation: number;
}
const User: React.FC<props> = ({ me, name, email, reputation }) => {
  return (
    <>
      <div className="py-2 px-5 border-b-2 flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{name}</h1>
          <h1 className="text-sm">email : {email}</h1>
          <h1 className="text-sm">reputation : {reputation}</h1>
        </div>
        {me ? <button className="h-6 mt-2">edit</button> : <></>}
      </div>
      <div className="py-2 px-5 border-b-2 flex">
        <Link href={`/profile/${name}`}>
          <a className="hover:underline text-sm">posts</a>
        </Link>
        <Link href={`/profile/${name}/comments`}>
          <a className="hover:underline text-sm ml-5">comments </a>
        </Link>
      </div>
    </>
  );
};

export default User;
