"use client";
import { UpdateConfigurationStatus } from "@/api/interface";
import Link from "next/link";
import { useState } from "react";
import {
  BsChevronRight,
  BsArrowDownUp,
  BsArrowDown,
  BsArrowUp,
} from "react-icons/bs";
import { SyncLoader } from "react-spinners";

export const InterfaceItem = ({ interfaceDetail }) => {
  const { id, name, peers, privateKey, status } = interfaceDetail;
  console.log(status);

  const [ChangeStatusLoading, setChangeStatusLoading] = useState(false);

  const ChangeStatus = async () => {
    setChangeStatusLoading(true);
    const ChangeStatusValue = {
      status: !interfaceDetail.status,
      id: interfaceDetail.id,
    };
    await UpdateConfigurationStatus(ChangeStatusValue)
      .then((res) => {
        console.log(res);
      })
      .finally(() => setChangeStatusLoading(false));
  };

  return (
    <div className="w-full my-4 border-2 border-[#3D3D3D] rounded hover:rounded-lg hover:border-blue-400 overflow-hidden transition-all duration-150">
      <Link
        href={`configuration/${id}`}
        className="p-4 border-b-2 border-b-[#3D3D3D] flex justify-between items-center hover:bg-gray-950"
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
        {ChangeStatusLoading ? (
          <>
            <SyncLoader color="#fff" size={8} />
          </>
        ) : (
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={status}
                className="sr-only peer"
                onChange={ChangeStatus}
              />
              <div
                className={`group peer bg-white rounded-full duration-300 w-8 h-4 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500  after:rounded-full after:absolute after:h-2 after:w-2 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-95 peer-checked:after:translate-x-4`}
              ></div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
