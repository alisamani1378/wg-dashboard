"use client";
import Button from "@/components/common/Button";
import { ConfigurationFormCard } from "../../ConfigurationFormCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useState } from "react";
import { PostPeerInterface } from "@/api/peer";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

export const CreatPeersSectionAddBulkForm = () => {
  const [bulkValue, setBulkValue] = useState({
    name: "",
    publicKey: "",
    presharedKey: "",
    allowedIPs: [""],
    endPoint: "",
    bulk: true,
    count: 0,
  });

  const router = useRouter();
  const pathname = usePathname();

  const handleInputBulkValue = (e) => {
    e.preventDefault();
    setBulkValue({ ...bulkValue, [e.target.name]: +e.target.value });
  };

  const submitAddBulkForm = async (e) => {
    e.preventDefault();
    if (bulkValue.count <= 0 || bulkValue.count >= 254)
      return toast.error("Bulk Count");

    await PostPeerInterface(pathname.split("/")[2], {
      ...bulkValue,
    }).then((res) => {
      const { isSuccess } = res;
      if (isSuccess) {
        toast.success(res.message);
        router.back();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <ConfigurationFormCard title={"Peers"}>
        <form onSubmit={submitAddBulkForm}>
          <div>
            <input
              type="number"
              name="count"
              onChange={handleInputBulkValue}
              placeholder="How many peers you want to add?"
              className={`w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none ${
                bulkValue.count >= 254 || bulkValue.count < 0
                  ? "border-red-500"
                  : ""
              }`}
            />
            <p className="text-xs mt-1">You can add up to 244 peers</p>
          </div>

          {/* this is a gap */}
          <div className="h-[1px] bg-primaryLight my-4 rounded"></div>

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
          <div className="h-[1px] bg-primaryLight my-4 rounded"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
          </div>
          <div className="flex justify-end mt-4">
            <Button>
              <BsFillPlusCircleFill />
              Add
            </Button>
          </div>
        </form>
      </ConfigurationFormCard>
    </>
  );
};
