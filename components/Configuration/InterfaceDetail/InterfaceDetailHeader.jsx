"use client";
import Link from "next/link";
import { InterfaceDetailHeaderCard } from "./InterfaceDetailHeaderCard";
import {
  BsArrowDown,
  BsArrowDownUp,
  BsArrowUp,
  BsEthernet,
  BsPlusLg,
} from "react-icons/bs";
import { useContext, useEffect, useState } from "react";

import InterfaceNameContext from "@/context/InterfaceNameContext";
import { GetInterfaceByName, UpdateConfigurationStatus } from "@/api/interface";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";

export const InterfaceDetailHeader = ({ interfaceId }) => {
  const [interFaceDataLoading, setInterFaceDataLoading] = useState(true);
  const [interFaceData, setInterFaceData] = useState();
  const [changeInterFaceStatus, setChangeInterFaceStatus] = useState(false);
  const { setInterfaceName } = useContext(InterfaceNameContext);

  const router = useRouter();

  const fetchInterFaceByName = async () => {
    GetInterfaceByName(interfaceId)
      .then((res) => {
        const { isSuccess, data, message } = res;
        if (isSuccess) {
          setInterFaceData(data);
        } else {
          toast.error(message);
          router.push("/");
          setInterFaceDataLoading(false);
        }
      })
      .finally(() => {
        setInterFaceDataLoading(false);
      });
  };

  useEffect(() => {
    fetchInterFaceByName();
  }, []);

  useEffect(() => {
    setInterfaceName(interfaceId);
  }, [interfaceId, setInterfaceName]);

  const name = interFaceData?.name;
  const status = interFaceData?.status;
  const totoalDataUsed = interFaceData?.totoalDataUsed / 1073741824;
  const totalData = interFaceData?.totalData / 1073741824;

  const handleChangeStatusWithInterFaceName = async () => {
    setChangeInterFaceStatus(true);
    const ChangeStatusValue = {
      status: status === "disabled" ? 0 : 1,
      name: name,
    };
    await UpdateConfigurationStatus(ChangeStatusValue)
      .then((res) => {
        window.location.reload();
        setChangeInterFaceStatus(false);
      })
      .finally(() => setChangeInterFaceStatus(false));
  };

  if (interFaceDataLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ScaleLoader color="#fff" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="leading-8">
          <p className="text-[24px] tracking-widest font-light text-[#B8B8B8]">
            Interface
          </p>
          <p className="text-[32px] font-bold">{name}</p>
        </div>
        <div className="w-[132px] flex justify-between items-center px-5 py-2 border border-primaryLight rounded">
          <div>
            <p>Status</p>
            <input
              type="checkbox"
              disabled={changeInterFaceStatus}
              checked={status !== "disabled"}
              onChange={handleChangeStatusWithInterFaceName}
              className="toggle toggle-sm checked:toggle-success mt-2"
            />
          </div>
          <div>
            <span className="w-3 h-3 bg-white rounded-full flex justify-center items-center">
              {interFaceData?.status !== "disabled" ? (
                <span className="w-[6px] h-[6px] mx-auto block bg-green-800 rounded-full animate-ping"></span>
              ) : (
                <span className="w-[6px] h-[6px] mx-auto block bg-red-800 rounded-full animate-ping"></span>
              )}
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
          amount={totalData.toFixed(4)}
          showGb
          icon={<BsArrowDownUp className="text-[28px]" />}
        />
        <InterfaceDetailHeaderCard
          title={"Total Received"}
          amount={totoalDataUsed.toFixed(4)}
          showGb
          amountColor={"blue"}
          icon={<BsArrowDown className="text-[28px] text-blue-600" />}
        />
        <InterfaceDetailHeaderCard
          title={"Total Sent"}
          amount={0}
          showGb
          amountColor={"green"}
          icon={<BsArrowUp className="text-[28px] text-green-600" />}
        />
      </div>
      {/* this is a gap */}
      <div className="h-[2px] bg-primaryLight my-8 rounded"></div>

      <div className="w-full md:w-1/6 text-[#77ABF8] border border-[#063274] rounded bg-[#084298]/40 backdrop-blur hover:bg-[#084298]/60 transition-all duration-100">
        <Link
          href={`/configuration/${interfaceId}/creat`}
          className="h-full flex items-center justify-center gap-2 py-3"
        >
          <BsPlusLg />
          Peer
        </Link>
      </div>

      {/* this is a gap */}
      <div className="h-[2px] bg-primaryLight my-8 rounded"></div>
    </>
  );
};
