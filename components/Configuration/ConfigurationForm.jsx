"use client";
import { PostConfigurationInterface } from "@/api/interface";
import { ConfigurationFormCard } from "@/components/Configuration/ConfigurationFormCard";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsFillSaveFill, BsArrowRepeat } from "react-icons/bs";
import nacl from "tweetnacl";
import naclUtil from "tweetnacl-util";
import Button from "../common/Button";
import { BarLoader } from "react-spinners";

export const ConfigurationForm = () => {
  const [configValue, setConfigValue] = useState({
    address: window.location.hostname,
    endPoint: window.location.hostname,
    saveConfig: true,
    preUp: null,
    postUp: null,
    preDown: null,
    postDown: null,
    listenPort: null,
    privateKey: "",
    publicKey: "",
    name: "",
    ipAddress: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false)

  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);


  //   generateKeys for publicKey and privateKey
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
  }, [generateKeys]);

  //   this is for input in form
  const handleConfigInputValue = (e) => {
    e.preventDefault();
    setConfigValue({
      ...configValue,
      [e.target.name]: e.target.value,
    });
  };

  //   submit form and post
  const submitPostConfigValue = async (e) => {
    e.preventDefault();

    if (!configValue.name) return toast.error("Configuration Name");
    if (
      !configValue.listenPort ||
      configValue.listenPort > 65353 ||
      configValue.listenPort < 0
    )
      return toast.error("Listen Port");
    if (!configValue.ipAddress) return toast.error("Ip Address");

    console.log(configValue);

    await PostConfigurationInterface(configValue)
      .then((res) => {
        const { isSuccess, message } = res;
        if (isSuccess) {
          toast.success(message);
          router.push("/");
        } else toast.error(message);
      })
      .catch((er) => {
        console.log(er);
        toast.error("failed");
      })
      .finally(() => {
        setSubmitLoading(false)
      })
  };

  return (
    <form
      onSubmit={submitPostConfigValue}
      className="w-full flex flex-col gap-6 pt-6"
    >
      <ConfigurationFormCard title={"Interface Name"}>
        <input
          name="name"
          onChange={handleConfigInputValue}
          type="text"
          placeholder="ex. wg1"
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
      </ConfigurationFormCard>
      <ConfigurationFormCard title={"Private Key / Public Key"}>
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
          className={`w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none ${
            configValue.listenPort > 65353 || configValue.listenPort < 0
              ? "border-red-300"
              : ""
          }`}
        />
      </ConfigurationFormCard>
      <ConfigurationFormCard title={"IP Address & Range"}>
        <input
          type="text"
          name="ipAddress"
          onChange={handleConfigInputValue}
          placeholder="Ex: 10.0.0.1/24"
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
      </ConfigurationFormCard>
      <ConfigurationFormCard title={"Endpoint"}>
        <input
          type="text"
          name="endPoint"
          defaultValue={configValue.address}
          onChange={(e) => {
            e.preventDefault();
            setConfigValue({
              ...configValue,
              ["endPoint"]: `${e.target.value}`,
            });
          }}
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
      </ConfigurationFormCard>

      {/* this is a gap */}
      <div className="h-[2px] bg-primaryLight my-4 rounded"></div>

      {/* accordion for optional form */}
      <div className="collapse collapse-arrow rounded border border-primaryLight">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium bg-[#1F1F1F] collapse-close">
          Optional Settings
        </div>
        <div className="collapse-content">
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <ConfigurationFormCard title={"PreUp"}>
              <input
                type="number"
                name="preUp"
                onChange={handleConfigInputValue}
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
              />
            </ConfigurationFormCard>
            <ConfigurationFormCard title={"PreDown"}>
              <input
                type="number"
                name="preDown"
                onChange={handleConfigInputValue}
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
              />
            </ConfigurationFormCard>
            <ConfigurationFormCard title={"PostUp"}>
              <input
                type="number"
                name="postUp"
                onChange={handleConfigInputValue}
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
              />
            </ConfigurationFormCard>
            <ConfigurationFormCard title={"PostDown"}>
              <input
                type="number"
                name="postDown"
                onChange={handleConfigInputValue}
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
              />
            </ConfigurationFormCard>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button>
          {submitLoading ? <>
            <BarLoader />
          </> : <>
            Save Interface
            <BsFillSaveFill /></>}

        </Button>
      </div>
    </form>
  );
};
