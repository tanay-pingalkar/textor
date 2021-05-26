import NavToggle from "./navToggle";

interface props {
  where: string;
  auth: boolean;
}
const MainNav: React.FC<props> = ({ where }) => {
  return (
    <div className="flex border-white border-b-2 justify-between px-5 ">
      <h1 className="font-rubik font-bold text-2xl tracking-widest  pt-2 pb-2 w-44">
        {where}
      </h1>
      <input
        className="h-6 mt-3 border-gray-900 pl-1"
        placeholder="search"
      ></input>
      <NavToggle></NavToggle>
    </div>
  );
};

export default MainNav;
