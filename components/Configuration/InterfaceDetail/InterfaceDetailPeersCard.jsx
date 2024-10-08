"use client"
import { useState } from "react";
import { GetPeerConfig } from "@/api/peer";
import { BsThreeDots } from "react-icons/bs";
import { QRCodeSVG } from "qrcode.react";


export const InterfaceDetailPeersCard = ({ peerDetail }) => {
  const { name, id } = peerDetail;
  const [peerConfig, setPeerConfig] = useState();

  const handleGetPeerConfig = async () => {
    await GetPeerConfig(name).then(res => {
      setPeerConfig(res?.data)
    })
  }

  const data = peerConfig;


  const lines = data?.split('\n');
  const selectedData = lines?.slice(1, 4).join('\n');





  return (
    <div className="col-span-1 p-4 border border-primaryLight rounded-md flex justify-between items-center">
      {name}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" onClick={handleGetPeerConfig} className="btn btn-sm m-1"><BsThreeDots /></div>
        <ul tabIndex={0} className="dropdown-content menu bg-secondary rounded-box z-[1] p-10 shadow">
          <QRCodeSVG value={data} size={256} level={"H"} />
        </ul>
      </div>
    </div>
  );
};
