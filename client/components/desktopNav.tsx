import Search from "./search";

import NavToggle from "./navToggle";

interface props {
  where: string;
  auth: boolean;
}
const MainNav: React.FC<props> = ({ where }) => {
  return (
    <div className="flex justify-between  border-b-2 px-5 py-1 ">
      <h1 className="font-bold text-2xl tracking-widest mt-1">{where}</h1>
      <Search></Search>
      <NavToggle></NavToggle>
    </div>
  );
};

export default MainNav;
