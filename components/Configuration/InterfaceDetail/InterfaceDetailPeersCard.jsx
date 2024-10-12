"use client";
import { useState } from "react";
import { GetPeerConfig } from "@/api/peer";
import {
  BsArrowDown,
  BsArrowUp,
  BsDownload,
  BsQrCode,
  BsShare,
  BsThreeDots,
} from "react-icons/bs";
import { QRCodeSVG } from "qrcode.react";

export const InterfaceDetailPeersCard = ({ peerDetail }) => {
  const { name, allowedIPs, publicKey } = peerDetail;
  const [peerConfig, setPeerConfig] = useState();
  const [qrLoading, setQrLoading] = useState(false);
  const [openQrCodeModalId, setQrCodeOpenModalId] = useState(null);

  const handleGetPeerConfig = async (name) => {
    await GetPeerConfig(name)
      .then((res) => {
        setPeerConfig(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenQrCodeModal = async (name) => {
    setQrLoading(true);
    await handleGetPeerConfig(name);
    setQrCodeOpenModalId(name);
    setTimeout(() => {
      setQrLoading(false);
    }, 1000);
  };

  const handleCloseQrCodeModal = () => {
    setQrCodeOpenModalId(null);
  };

  return (
    <>
      <div className="col-span-1 w-full h-[240px] grid grid-cols-4 grid-rows-4 p-2 border border-primaryLight rounded-md ">
        <div className="col-start-3 flex items-center justify-center gap-1 text-blue-600">
          <BsArrowDown />
          <span>0.00000</span>
          <span>GB</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-green-600">
          <BsArrowUp />
          <span>0.00000</span>
          <span>GB</span>
        </div>
        <div className="col-span-3">
          <p className="line-clamp-1">{name}</p>
        </div>
        <div className="col-span-4 ">
          <span className="font-semibold">Public Key</span>
          <p className="truncate">{publicKey}=</p>
        </div>
        <div className="col-span-3">
          <span className="font-semibold">Allowed IP</span>
          <p className="tracking-widest">{allowedIPs}</p>
        </div>
        <div className="col-span-1 flex items-center justify-end dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm m-1 bg-transparent hover:bg-primaryLight text-secondary"
          >
            <BsThreeDots />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-secondary rounded-box z-[1] w-[160px] shadow"
          >
            <div className="rounded-xl py-2 !bg-primaryLight !text-secondary grid grid-cols-3 place-items-center">
              <span className="btn !w-[28px] !min-h-[28px] !h-[24px] p-1">
                <BsDownload />
              </span>
              <span
                onClick={() => handleOpenQrCodeModal(name)}
                // onClick={() => {
                //   document.getElementById("Qrcode_modal").showModal();
                //   setQrLoading(true);
                //   handleGetPeerConfig();
                //   setTimeout(() => {
                //     setQrLoading(false);
                //   }, 2200);
                // }}
                className="btn !w-[28px] !min-h-[28px] !h-[24px] p-1"
              >
                <BsQrCode />
              </span>
              <span className="btn !w-[28px] !min-h-[28px] !h-[24px] p-1">
                <BsShare />
              </span>
            </div>
          </ul>

          {/*qrcode modal for each peer*/}
          {openQrCodeModalId === name && (
            <dialog open className="modal">
              <div className="modal-box bg-secondary text-primaryLight flex items-center justify-center">
                <form method="dialog">
                  <button
                    onClick={handleCloseQrCodeModal}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </button>
                </form>
                {qrLoading ? (
                  <>
                    <div>loading...</div>
                  </>
                ) : (
                  <>
                    <QRCodeSVG value={peerConfig} size={256} level={"H"} />
                  </>
                )}
              </div>
              <form method="dialog" className="modal-backdrop">
                <button onClick={handleCloseQrCodeModal}>close</button>
              </form>
            </dialog>
          )}
        </div>
      </div>
    </>
  );
};
