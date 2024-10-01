import Link from "next/link";
import {
  BsChevronRight,
  BsArrowDownUp,
  BsArrowDown,
  BsArrowUp,
} from "react-icons/bs";

export const InterfaceItem = ({ interfaceDetail }) => {
  console.log(interfaceDetail);
  const { name, peers, privateKey } = interfaceDetail;
  const status = false;

  return (
    <div className="w-full my-4 border-2 border-gray-800 rounded hover:rounded-lg hover:border-[rgb(255,74,0)] dark:hover:border-blue-400 overflow-hidden transition-all duration-150">
      <Link
        href={"/"}
        className="p-4 border-b-2 border-b-gray-800 flex justify-between items-center dark:hover:bg-gray-950 hover:bg-gray-100"
      >
        <div className="">
          <span className="w-[6px] h-[6px] mr-2 bg-green-500 rounded-full animate-ping"></span>
          {name}
        </div>
        <BsChevronRight />
      </Link>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[14px] px-4 py-4">
        <div className="col-span-1 flex items-center gap-1">
          <BsArrowDownUp />1<span>GB</span>
        </div>
        <div className="col-span-1 flex items-center gap-1 text-blue-600">
          <BsArrowDown />2<span>GB</span>
        </div>
        <div className="col-span-1 flex items-center gap-1 text-green-600">
          <BsArrowUp />3<span>GB</span>
        </div>
        <div className="col-span-1 flex items-center gap-1">
          <span className="w-[6px] h-[6px] mr-2 bg-green-400 rounded-full animate-ping"></span>
          {peers.length}
          <span>Peers</span>
        </div>
      </div>
      <div className="w-full px-4 pb-4 flex justify-between items-center">
        <div className="w-full md:flex pr-5">
          <span className="whitespace-nowrap">Public Key:</span>
          <span className="ml-2 dark:text-gray-400 break-all">
            {privateKey}
          </span>
        </div>
        <div className="flex flex-col justify-center md:flex-row md:items-center md:gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={status}
              className="sr-only peer"
              value=""
            />
            <div
              className={`group peer bg-white rounded-full duration-300 w-8 h-4 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500  after:rounded-full after:absolute after:h-2 after:w-2 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-95 peer-checked:after:translate-x-4`}
            ></div>
          </label>
        </div>
      </div>
    </div>
  );
};
