"use client";
import { useState } from "react";
import { GetPeerConfig } from "@/api/peer";
import {
  BsArrowDown,
  BsArrowUp,
  BsDownload,
  BsPen,
  BsQrCode,
  BsShare,
  BsThreeDots,
} from "react-icons/bs";
import { QRCodeSVG } from "qrcode.react";
import { EditPeer } from "@/components/Configuration/InterfaceDetail/EditPeer";

export const InterfaceDetailPeersCard = ({ peerDetail }) => {
  const { name, allowedIPs, publicKey, status } = peerDetail;
  const [peerConfig, setPeerConfig] = useState();
  const [modalLoading, setModalLoading] = useState(false);
  const [openModalId, setOpenModalId] = useState(null);
  const [modalFor, setModalFor] = useState("");

  const GetPeerConfigFetch = async (name) => {
    await GetPeerConfig(name)
      .then((res) => {
        setPeerConfig(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenQrCodeModal = async (name) => {
    console.log(modalFor);
    setModalLoading(true);
    await GetPeerConfigFetch(name);
    setOpenModalId(name);
    setModalFor("qrcode");
    setTimeout(() => {
      setModalLoading(false);
    }, 1000);
  };

  const handleOpenEditPeerModal = async (name) => {
    setModalLoading(true);
    setOpenModalId(name);
    setModalFor("edit_peer");
    setTimeout(() => {
      setModalLoading(false);
    }, 1000);
  };

  const handleCloseQrCodeModal = () => {
    setOpenModalId(null);
  };

  return (
    <>
      <div className="col-span-1 w-full h-[240px] grid grid-cols-4 grid-rows-4 p-2 border border-primaryLight rounded-md ">
        <span
          className={`w-fit h-fit text-[12px] px-1 py-0.5 rounded ${
            status === "onhold"
              ? "bg-yellow-500"
              : status === "active"
                ? "bg-green-500"
                : status === "expired"
                  ? "bg-red-500"
                  : status === "limited"
                    ? "bg-blue-500"
                    : status === "disabled"
                      ? "bg-indigo-500"
                      : null
          }`}
        >
          {status === "onhold" ? (
            <>On Hold</>
          ) : status === "active" ? (
            <>Active</>
          ) : status === "expired" ? (
            <>Expired</>
          ) : status === "limited" ? (
            <>Limited</>
          ) : status === "disabled" ? (
            <>Disable</>
          ) : (
            ""
          )}
        </span>
        <div className="col-start-2 col-end-5 xl:col-start-3 flex items-center justify-between">
          <div className="w-full flex items-center justify-center gap-1 text-blue-600 text-sm">
            <BsArrowDown />
            <span>0.00000</span>
            <span>GB</span>
          </div>
          <div className="w-full flex items-center justify-center gap-1 text-green-600 text-sm">
            <BsArrowUp />
            <span>0.00000</span>
            <span>GB</span>
          </div>
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
            className="dropdown-content menu bg-white/30 backdrop-blur rounded-box z-[1] w-[160px] shadow gap-2"
          >
            <li className="w-full !bg-transparent grid grid-cols-3 gap-2">
              <span className="btn w-full !min-h-[32px] !h-[32px] p-1">
                <BsDownload />
              </span>
              <span
                onClick={() => {
                  setModalFor("qrcode");
                  handleOpenQrCodeModal(name);
                }}
                className="btn w-full !min-h-[32px] !h-[32px] p-1"
              >
                <BsQrCode />
              </span>
              <span className="btn w-full !min-h-[32px] !h-[32px] p-1">
                <BsShare />
              </span>
            </li>
            <li className="w-full bg-transparent">
              <span
                onClick={() => {
                  setModalFor("edit_peer");
                  handleOpenEditPeerModal(name);
                }}
                className="btn w-full !min-h-[32px] !h-[32px] p-1 "
              >
                Edit <BsPen />
              </span>
            </li>
          </ul>

          {/*modal for each peer*/}
          {openModalId === name && (
            <dialog open className="modal bg-white/5 backdrop-blur">
              <div className="modal-box bg-secondary text-primaryLight flex items-center justify-center">
                <form method="dialog">
                  <button
                    onClick={handleCloseQrCodeModal}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </button>
                </form>
                {modalLoading ? (
                  <>
                    <div>loading...</div>
                  </>
                ) : (
                  <>
                    {modalFor === "qrcode" ? (
                      <QRCodeSVG value={peerConfig} size={256} level={"H"} />
                    ) : modalFor === "edit_peer" ? (
                      <EditPeer EditPeerData={peerDetail} />
                    ) : null}
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
