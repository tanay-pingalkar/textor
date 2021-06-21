import NavToggle from "./navToggle";

interface props {
  where: string;
  auth: boolean;
}
const MainNav: React.FC<props> = ({ where }) => {
  return (
    <div className="flex justify-between  border-b-2 px-5 py-1 ">
      <h1 className="font-bold text-2xl tracking-widest mt-1">{where}</h1>
      <input
        className="h-7 border-gray-900 mt-1 dark:bg-gray-100"
        placeholder="search"
      ></input>
      <NavToggle></NavToggle>
    </div>
  );
};

export default MainNav;
