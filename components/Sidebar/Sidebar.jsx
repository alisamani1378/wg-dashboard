import Link from "next/link";
import { BsHouse } from "react-icons/bs";

export const Sidebar = () => {
  return (
    <div className="hidden md:block md:w-1/4 lg:w-1/5 h-full px-4 py-6">
      <div className="w-full h-full rounded-lg border-2 border-primaryLight p-3">
        <Link
          href={"/"}
          className="flex items-center gap-3 w-full px-4 py-2 border border-primaryLight hover:bg-[#292929] rounded transition-all duration-75"
        >
          <BsHouse />
          Home
        </Link>
      </div>
    </div>
  );
};
