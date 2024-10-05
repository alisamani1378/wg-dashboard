import Link from "next/link";
import { BsBodyText } from "react-icons/bs";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Button from "../common/Button";

export const MainSectionTopHeader = () => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center md:justify-normal gap-4 text-[24px]">
        <BsBodyText />
        <div>WireGuard Configurations</div>
      </div>
      <Link href={"configuration"}>
        <Button>
          <BsFillPlusCircleFill />
          Configuration
        </Button>
      </Link>
    </div>
  );
};
