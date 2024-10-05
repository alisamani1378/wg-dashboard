"use client";
import {
  BsArrowRepeat,
  BsPlus,
  BsChevronDown,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";
import Button from "@/components/common/Button";

export const CreatPeersSectionOptionalForm = () => {
  const [peerValue, setPeerValue] = useState({ privateKey: "", publicKey: "" });

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

  useEffect(() => {
    generateKeys();
  }, []);

  return (
    <>
      <form className="flex flex-col gap-3">
        <div>
          <label className="mb-2 block font-bold">Name</label>
          <input
            type="text"
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
          <div className="w-full md:flex justify-between items-center">
            <div className="flex-1 flex items-center">
              <input
                type="text"
                placeholder="Enter IP Address/CIDR"
                className="w-full bg-transparent rounded-l-lg border border-r-0 border-[#666666] border-stroke px-3 py-2 outline-none"
              />
              <span className="h-[42px] flex justify-center items-center p-2 rounded-r-lg border border-[#666666] text-green-500 hover:bg-green-900 hover:text-white hover:border-white transition-all duration-100 cursor-pointer">
                <BsPlus className="text-[20px]" />
              </span>
            </div>
            <span className="hidden md:block mx-2">Or</span>
            <div className="w-full md:w-fit flex justify-end mt-4 md:mt-0">
              <details className="dropdown dropdown-end ">
                <summary className="btn btn-sm bg-[#707070] text-white border-none hover:!bg-[#707070]">
                  Pick Available IP
                  <BsChevronDown />
                </summary>
                <ul className="menu dropdown-content bg-[#B8B8B8] text-[#525252] h-[200px] rounded-box z-[1] w-52 p-2 shadow">
                  <li className="rounded-xl">
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </details>
            </div>
          </div>
        </div>
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
        <div className="h-[1px] bg-primaryLight my-4 rounded"></div>

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
