import { BsList } from "react-icons/bs";

export const Header = () => {
  return (
    <div className="h-[56px] w-full flex justify-between items-center px-3 border-b">
      <p className="text-xl font-bold">WGDashboard</p>
      <BsList className="text-[28px] md:hidden" />
    </div>
  );
};
