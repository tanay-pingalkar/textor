import Search from "./search";

import NavToggle from "./navToggle";

interface props {
  where: string;
}
const MobileNav: React.FC<props> = ({ where }) => {
  return (
    <div className="border-b-2">
      <div className=" flex justify-between px-5">
        <h1 className="font-bold text-2xl tracking-widest  pt-2 pb-2 w-26 ">
          {where}
        </h1>
        <NavToggle></NavToggle>
      </div>
      <div className="flex justify-center mb-3 px-5">
        <Search></Search>
      </div>
    </div>
  );
};

export default MobileNav;
