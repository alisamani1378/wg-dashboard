import { BsBodyText } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";

export const MainSectionTopHeader = () => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center md:justify-normal gap-4 text-[24px]">
        <BsBodyText />
        <div>WireGuard Configurations</div>
      </div>
      <div className="w-full md:w-[160px] flex justify-center items-center gap-4 py-3 mt-4 md:m-0 rounded-lg bg-[rgb(255,74,0)] bg-gradient-to-br from-[rgba(255,74,0,1)] to-[rgba(0,157,255,1)] [background:linear-gradient(190deg,rgba(255,74,0,1)_28%,rgba(0,157,255,1)_100%)]">
        <BsFillPlusCircleFill />
        Configuration
      </div>
    </div>
  );
};
