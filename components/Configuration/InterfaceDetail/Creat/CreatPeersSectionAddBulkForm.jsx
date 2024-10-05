import { ConfigurationFormCard } from "../../ConfigurationFormCard";
import { BsFillPlusCircleFill } from "react-icons/bs";

export const CreatPeersSectionAddBulkForm = () => {
  return (
    <>
      <ConfigurationFormCard title={"Peers"}>
        <form>
          <div>
            <input
              type="number"
              // name="listenPort"
              // onChange={handleConfigInputValue}
              placeholder="How many peers you want to add?"
              className={`w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none`}
            />
            <p className="text-xs mt-1">You can add up to 244 peers</p>
          </div>

          {/* this is a gap */}
          <div className="h-[1px] bg-[primaryLight my-4 rounded"></div>

          <div>
            <label className="mt-2 mb-1 block font-bold">
              Endpoint Allowed IPs
            </label>
            <input
              type="text"
              defaultValue={"0.0.0.0/0"}
              className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="mt-2 mb-1 block font-bold">DNS</label>
            <input
              type="text"
              defaultValue={"1.1.1.1"}
              className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
            />
          </div>

          {/* this is a gap */}
          <div className="h-[1px] bg-[primaryLight my-4 rounded"></div>

          <div>
            <label className="mt-2 mb-1 block font-bold">MTU</label>
            <input
              type="number"
              defaultValue={1420}
              className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="mt-2 mb-1 block font-bold">
              Persistent Keepalive
            </label>
            <input
              type="number"
              defaultValue={21}
              className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              //   disabled={isValid}
              className="w-fit flex justify-center items-center gap-3 px-4 py-2 mt-4 md:m-0 rounded-lg transition-all duration-500 bg-gradient-to-br from-[rgba(255,74,0,1)] via-[rgba(0,157,255,1)] to-[#009dff] bg-size-200 bg-pos-0 hover:bg-pos-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BsFillPlusCircleFill />
              Add
            </button>
          </div>
        </form>
      </ConfigurationFormCard>
    </>
  );
};
