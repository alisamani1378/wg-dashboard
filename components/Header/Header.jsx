import { BsList } from "react-icons/bs";

export const Header = () => {
  return (
    <div className="h-[56px] w-full flex justify-between items-center px-4 border-b">
      <p className="text-[24px] font-bold tracking-wider">WGDashboard</p>
      <BsList className="text-[28px] md:hidden" />
    </div>
  );
};
