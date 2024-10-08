"use client";
import { useState } from "react";
import { GetPeerConfig } from "@/api/peer";
import { BsDownload, BsQrCode, BsShare, BsThreeDots } from "react-icons/bs";
import { QRCodeSVG } from "qrcode.react";

export const InterfaceDetailPeersCard = ({ peerDetail }) => {
  const { name } = peerDetail;
  const [peerConfig, setPeerConfig] = useState();

  const handleGetPeerConfig = async () => {
    await GetPeerConfig(name).then((res) => {
      setPeerConfig(res?.data);
    });
  };

  return (
    <div className="col-span-1 p-4 border border-primaryLight rounded-md flex justify-between items-center">
      {name}
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          onClick={handleGetPeerConfig}
          className="btn btn-sm m-1 bg-transparent hover:bg-primaryLight text-secondary"
        >
          <BsThreeDots />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-secondary rounded-box z-[1] shadow"
        >
          <div className="rounded-xl py-2 !bg-primaryLight !text-secondary grid grid-cols-3 place-items-center">
            <span className="btn !w-[28px] !min-h-[28px] !h-[24px] p-1">
              <BsDownload />
            </span>
            <span
              onClick={() =>
                document.getElementById("Qrcode_modal").showModal()
              }
              className="btn !w-[28px] !min-h-[28px] !h-[24px] p-1"
            >
              <BsQrCode />
              <dialog id="Qrcode_modal" className="modal">
                <div className="modal-box">
                  <QRCodeSVG value={peerConfig} size={256} level={"H"} />
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </span>
            <span className="btn !w-[28px] !min-h-[28px] !h-[24px] p-1">
              <BsShare />
            </span>
          </div>
        </ul>
      </div>
    </div>
  );
};
