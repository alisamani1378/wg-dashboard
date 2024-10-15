"use client";
import { BsArrowRepeat, BsFillPlusCircleFill, BsPlus } from "react-icons/bs";
import { useEffect, useState } from "react";
import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";
import Button from "@/components/common/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { GetIpAddress } from "@/api/IpAddress";
import { usePathname } from "next/navigation";

export const CreatPeersSectionOptionalForm = () => {
  const [optionalPeerValue, setOptionalPeerValue] = useState({
    name: "",
    publicKey: "",
    presharedKey: "",
    allowedIPs: [""],
    endPoint: "",
    bulk: false,
    count: 0,
    dns: "8.8.8.8,4.2.2.4",
    mtu: 1420,
    persistentKeepalive: 21,
    endpointAllowedIPs: "0.0.0.0/0",
    expireTime: 0,
    totalVolume: 0,
    status: "",
    onHoldExpireDurection: 0,
  });
  const [interfaceIpAdresses, setInterfaceIpAdresses] = useState([]);
  const [peerValue, setPeerValue] = useState({ privateKey: "", publicKey: "" });

  const pathname = usePathname();

  //   generateKeys for publicKey and privateKey
  const generateKeys = () => {
    // Generate the key pair
    const keyPair = nacl.box.keyPair();

    // Convert keys to Base64 for easy display
    const publicKey = naclUtil.encodeBase64(keyPair.publicKey);
    const privateKey = naclUtil.encodeBase64(keyPair.secretKey);
    setPeerValue({
      ...peerValue,
      ["privateKey"]: privateKey,
      ["publicKey"]: publicKey,
    });
  };

  const fetchInterFaceIpAdresses = async () => {
    await GetIpAddress(pathname.split("/")[2]).then((res) => {
      console.log(res);
      setInterfaceIpAdresses(res.data.sort((a, b) => a.id - b.id));
    });
  };

  useEffect(() => {
    generateKeys();
    fetchInterFaceIpAdresses();
  }, []);

  return (
    <>
      <form className="flex flex-col gap-3">
        <div>
          <label className="mb-2 block font-bold">Name</label>
          <input
            type="text"
            name={optionalPeerValue.name}
            className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block font-bold">
            PRIVATE KEY{" "}
            <span className="text-[#E04000] text-sm font-light">
              &#x0028;Required for Qr Code and Download&#x0029;
            </span>
          </label>
          <div className="w-full flex items-center">
            <input
              type="text"
              readOnly
              value={peerValue.privateKey}
              className="w-full bg-transparent rounded-l-lg border border-r-0 border-[#666666] border-stroke px-3 py-2 outline-none"
            />
            <span
              onClick={generateKeys}
              className="h-[42px] flex justify-center items-center p-2 rounded-r-lg border border-[#666666] text-[#0d6efd] hover:bg-[#0d6efd] hover:text-white hover:border-white transition-all duration-100 cursor-pointer"
            >
              <BsArrowRepeat className="text-[20px]" />
            </span>
          </div>
        </div>
        <div>
          <label className="mb-2 block font-bold">
            PUBLIC KEY{" "}
            <span className="text-[#E04000] text-sm font-light">
              &#x0028;Required&#x0029;
            </span>
          </label>
          <input
            type="text"
            readOnly
            value={peerValue.publicKey}
            className="w-full bg-[#666666] rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none "
          />
        </div>
        <div>
          <label className="mb-2 block font-bold">
            Allowed IPs{" "}
            <span className="text-[#E04000] text-sm font-light">
              &#x0028;Required&#x0029;
            </span>
          </label>
          <div className="w-full flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center">
              <input
                type="text"
                name={optionalPeerValue.allowedIPs}
                placeholder="Enter IP Address/CIDR"
                className="w-full bg-transparent rounded-l-lg border border-r-0 border-[#666666] border-stroke px-3 py-2 outline-none"
              />
              <span className="h-[42px] flex justify-center items-center p-2 rounded-r-lg border border-[#666666] text-green-500 hover:bg-green-900 hover:text-white hover:border-white transition-all duration-100 cursor-pointer">
                <BsPlus className="text-[20px]" />
              </span>
            </div>
            <div className="w-[240px] whitespace-nowrap flex justify-end mt-2 md:mt-0">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full bg-secondary text-primary px-2 py-1 flex items-center justify-between gap-3 rounded !outline-none">
                  Allowed IPs
                  <ChevronDown size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[240px] max-h-[280px] bg-secondary overflow-y-auto">
                  {interfaceIpAdresses?.map((ip) => (
                    <div
                      className="w-full py-1 px-2 rounded hover:bg-primaryLight/80 cursor-pointer"
                      key={ip?.id}
                    >
                      {ip?.ip}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* this is a gap */}
        <div className="h-[1px] bg-primaryLight my-6 rounded"></div>

        <div>
          <label className="mb-2 block font-bold">
            Endpoint Allowed IPs{" "}
            <span className="text-[#E04000] text-sm font-light">
              &#x0028;Required&#x0029;
            </span>
          </label>
          <input
            type="text"
            defaultValue={"0.0.0.0/0"}
            className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
          />
        </div>
        <div>
          <label className="mb-2 block font-bold">DNS</label>
          <input
            type="text"
            defaultValue={"1.1.1.1"}
            className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
          />
        </div>

        {/* this is a gap */}
        <div className="h-[1px] bg-primaryLight my-6 rounded"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="col-span-1">
            <label className="mb-2 block font-bold">Pre-Shared Key</label>
            <input
              type="text"
              className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
            />
          </div>
          <div className="col-span-1">
            <label className="mb-2 block font-bold">MTU</label>
            <input
              type="number"
              defaultValue={"1421"}
              className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
            />
          </div>
          <div className="col-span-1">
            <label className="mb-2 block font-bold">Persistent keepalive</label>
            <input
              type="number"
              defaultValue={"21"}
              className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button>
            <BsFillPlusCircleFill />
            Add
          </Button>
        </div>
      </form>
    </>
  );
};
