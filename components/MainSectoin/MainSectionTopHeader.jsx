import Link from "next/link";
import { BsBodyText } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";

export const MainSectionTopHeader = () => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center md:justify-normal gap-4 text-[24px]">
        <BsBodyText />
        <div>WireGuard Configurations</div>
      </div>
      <Link
        href={"configuration"}
        className="w-full md:w-[160px] flex justify-center items-center gap-4 py-3 mt-4 md:m-0 rounded-lg transition-all duration-500 bg-gradient-to-br from-[rgba(255,74,0,1)] via-[rgba(0,157,255,1)] to-[#009dff] bg-size-200 bg-pos-0 hover:bg-pos-100"
      >
        <BsFillPlusCircleFill />
        Configuration
      </Link>
    </div>
  );
};
