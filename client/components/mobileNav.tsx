import { useRouter } from "next/router";
import NavToggle from "./navToggle";

interface props {
  where: string;
}
const MobileNav: React.FC<props> = ({ where }) => {
  const router = useRouter();
  return (
    <div className="border-b-2">
      <div className=" flex justify-between px-5">
        <h1 className="font-bold text-2xl tracking-widest  pt-2 pb-2 w-26 ">
          {where}
        </h1>
        <NavToggle></NavToggle>
      </div>
      <div className="flex justify-center mb-3 px-5">
        <input
          className="h-6 pl-1 w-full "
          placeholder="search"
          onChange={(e) => {
            if (e.target.value.trim() !== "") {
              router.replace(`/search/${e.target.value}`);
            }
          }}
        ></input>
      </div>
    </div>
  );
};

export default MobileNav;
