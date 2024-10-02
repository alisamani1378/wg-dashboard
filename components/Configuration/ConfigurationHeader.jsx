import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

export const ConfigurationHeader = () => {
  return (
    <Link
      href={"/"}
      className="w-fit flex items-center gap-4 justify-start text-[28px] font-bold"
    >
      <BsChevronLeft />
      New Interface
    </Link>
  );
};
