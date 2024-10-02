"use client";
import { PostConfigurationInterface } from "@/api/interface";
import { ConfigurationFormCard } from "@/components/Configuration/ConfigurationFormCard";
import { useEffect, useState } from "react";
import { BsFillSaveFill, BsArrowRepeat } from "react-icons/bs";
import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";

export const ConfigurationForm = () => {
  const [configValue, setConfigValue] = useState({
    address: "",
    saveConfig: true,
    preUp: 0,
    postUp: 0,
    preDown: 0,
    postDown: 0,
    listenPort: 0,
    privateKey: "",
    publicKey: "",
    name: "",
    ipAddress: "",
  });
  //   const [isValid, setIsValid] = useState(true);

  const generateKeys = () => {
    // Generate the key pair
    const keyPair = nacl.box.keyPair();

    // Convert keys to Base64 for easy display
    const publicKey = naclUtil.encodeBase64(keyPair.publicKey);
    const privateKey = naclUtil.encodeBase64(keyPair.secretKey);
    setConfigValue({
      ...configValue,
      ["privateKey"]: privateKey,
      ["publicKey"]: publicKey,
    });
  };

  useEffect(() => {
    generateKeys();
  }, []);

  const handleConfigInputValue = (e) => {
    e.preventDefault();
    setConfigValue({ ...configValue, [e.target.name]: e.target.value });
  };

  //   const CheckIpAddress = () => {};

  const submitPostConfigValue = async (e) => {
    e.preventDefault();

    // if (!configValue.name) return

    PostConfigurationInterface(configValue).then((res) => {
      console.log(res);
    });
  };

  return (
    <form
      onSubmit={submitPostConfigValue}
      className="w-full flex flex-col gap-6 pt-6"
    >
      <div className="toast toast-end">
        <div className="alert alert-info">
          <span>New mail arrived.</span>
        </div>
        <div className="alert alert-success">
          <span>Message sent successfully.</span>
        </div>
      </div>
      <ConfigurationFormCard title={"Configuration Name"}>
        <input
          name="name"
          onChange={handleConfigInputValue}
          type="text"
          placeholder="ex. wg1"
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
      </ConfigurationFormCard>
      <ConfigurationFormCard
        title={"Private Key / Public Key / Pre-Shared Key"}
      >
        <div>
          <label className="mb-2 block font-bold">PRIVATE KEY</label>
          <div className="w-full flex items-center">
            <input
              type="text"
              readOnly
              value={configValue.privateKey}
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
          <label className="my-2 block font-bold">PUBLIC KEY</label>
          <input
            type="text"
            readOnly
            value={configValue.publicKey}
            className="w-full bg-[#666666] rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none "
          />
        </div>
      </ConfigurationFormCard>
      <ConfigurationFormCard title={"Listen Port"}>
        <input
          type="number"
          name="listenPort"
          onChange={handleConfigInputValue}
          placeholder="0-65353"
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
      </ConfigurationFormCard>
      <ConfigurationFormCard title={"IP Address & Range"}>
        <input
          type="text"
          name="ipAddress"
          onChange={(e) => {
            handleConfigInputValue(e);
            // CheckIpAddress(e);
          }}
          placeholder="Ex: 10.0.0.1/24"
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
      </ConfigurationFormCard>
      <div className="h-[2px] bg-[#3D3D3D] my-4 rounded"></div>
      <div className="collapse collapse-arrow rounded border border-[#3D3D3D]">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium bg-[#1F1F1F] collapse-close">
          Optional Settings
        </div>
        <div className="collapse-content">
          <div className="pt-4 flex flex-col gap-4">
            <ConfigurationFormCard title={"PreUp"}>
              <input
                type="number"
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
              />
            </ConfigurationFormCard>
            <ConfigurationFormCard title={"PreDown"}>
              <input
                type="number"
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
              />
            </ConfigurationFormCard>
            <ConfigurationFormCard title={"PostUp"}>
              <input
                type="number"
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
              />
            </ConfigurationFormCard>
            <ConfigurationFormCard title={"PostDown"}>
              <input
                type="number"
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
              />
            </ConfigurationFormCard>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          //   disabled={isValid}
          className="w-fit flex justify-center items-center gap-3 px-4 py-3 mt-4 md:m-0 rounded-lg transition-all duration-500 bg-gradient-to-br from-[rgba(255,74,0,1)] via-[rgba(0,157,255,1)] to-[#009dff] bg-size-200 bg-pos-0 hover:bg-pos-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Configuration
          <BsFillSaveFill />
        </button>
      </div>
    </form>
  );
};
