import Link from "next/link";
import { InterfaceDetailHeaderCard } from "./InterfaceDetailHeaderCard";
import {
  BsEthernet,
  BsArrowDownUp,
  BsArrowUp,
  BsArrowDown,
  BsPlusLg,
} from "react-icons/bs";

export const InterfaceDetailHeader = ({ interfaceId }) => {
  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="leading-8">
          <p className="text-[24px] tracking-widest font-light text-[#B8B8B8]">
            Interface
          </p>
          <p className="text-[32px] font-bold">{interfaceId}</p>
        </div>
        <div className="w-[132px] flex justify-between items-center px-5 py-2 border border-[#3D3D3D] rounded">
          <div>
            <p>Status</p>
            <div className="mt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  // checked={status}
                  className="sr-only peer"
                  // onChange={ChangeStatus}
                />
                <div
                  className={`group peer bg-white rounded-full duration-300 w-8 h-4 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500  after:rounded-full after:absolute after:h-2 after:w-2 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-95 peer-checked:after:translate-x-4`}
                ></div>
              </label>
            </div>
          </div>
          <div>
            <span className="w-3 h-3 bg-green-100 rounded-full flex justify-center items-center">
              <span className="w-[6px] h-[6px] mx-auto block bg-green-800 rounded-full animate-ping"></span>
            </span>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-10">
        <InterfaceDetailHeaderCard
          title={"Connected Peers"}
          amount={0}
          icon={<BsEthernet className="text-[28px]" />}
        />
        <InterfaceDetailHeaderCard
          title={"Total Usage"}
          amount={0.8559}
          showGb
          icon={<BsArrowDownUp className="text-[28px]" />}
        />
        <InterfaceDetailHeaderCard
          title={"Total Received"}
          amount={0.092}
          showGb
          amountColor={"blue"}
          icon={<BsArrowDown className="text-[28px] text-blue-600" />}
        />
        <InterfaceDetailHeaderCard
          title={"Total Sent"}
          amount={0.7638}
          showGb
          amountColor={"green"}
          icon={<BsArrowUp className="text-[28px] text-green-600" />}
        />
      </div>
      {/* this is a gap */}
      <div className="h-[2px] bg-[#3D3D3D] my-8 rounded"></div>

      <Link href={`${interfaceId}/creat`}>
        <div className="w-full md:w-1/6 flex items-center justify-center gap-2 py-3 text-[#77ABF8] border border-[#063274] rounded bg-[#084298]/40 backdrop-blur hover:bg-[#084298]/60 transition-all duration-100">
          <BsPlusLg />
          Peer
        </div>
      </Link>

      {/* this is a gap */}
      <div className="h-[2px] bg-[#3D3D3D] my-8 rounded"></div>
    </>
  );
};
