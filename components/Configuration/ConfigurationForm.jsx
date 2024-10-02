import { ConfigurationFormCard } from "@/components/Configuration/ConfigurationFormCard";
import { BsFillSaveFill } from "react-icons/bs";

export const ConfigurationForm = () => {
  return (
    <form className="w-full flex flex-col gap-6 pt-6">
      <ConfigurationFormCard title={"Configuration Name"}>
        <input
          type="text"
          placeholder="ex. wg1"
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
      </ConfigurationFormCard>
      <ConfigurationFormCard
        title={"Private Key / Public Key / Pre-Shared Key"}
      >
        <label className="mb-2 block font-bold">PRIVATE KEY</label>
        <input
          type="text"
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
        <label className="my-2 block font-bold">PUBLIC KEY</label>
        <input
          type="text"
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
      </ConfigurationFormCard>
      <ConfigurationFormCard title={"Listen Port"}>
        <input
          type="number"
          placeholder="0-65353"
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
      </ConfigurationFormCard>
      <ConfigurationFormCard title={"IP Address & Range"}>
        <input
          type="text"
          placeholder="Ex: 10.0.0.1/24"
          className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none  "
        />
      </ConfigurationFormCard>
      <div className="h-[2px] bg-[#3D3D3D] my-4 rounded"></div>
      <button
        disabled
        className="w-fit ml-auto px-4 flex justify-center items-center gap-3 py-2 mt-4 md:m-0 rounded-lg transition-all duration-500 bg-gradient-to-br from-[rgba(255,74,0,1)] via-[rgba(0,157,255,1)] to-[#009dff] bg-size-200 bg-pos-0 hover:bg-pos-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Configuration
        <BsFillSaveFill />
      </button>
    </form>
  );
};
