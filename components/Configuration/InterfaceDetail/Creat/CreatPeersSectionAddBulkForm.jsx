"use client";
import Button from "@/components/common/Button";
import { ConfigurationFormCard } from "../../ConfigurationFormCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { PostPeerInterface } from "@/api/peer";

export const CreatPeersSectionAddBulkForm = () => {
  const [bulkValue, setBulkValue] = useState({
    name: "",
    publicKey: "",
    presharedKey: "",
    allowedIPs: [""],
    endPoint: "",
    bulk: true,
    count: 0,
    dns: "8.8.8.8,4.2.2.4",
    mtu: 1420,
    persistentKeepalive: 21,
    endpointAllowedIPs: "0.0.0.0/0",
  });

  const [submitLoading, setSubmitLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleInputBulkValue = (e) => {
    e.preventDefault();
    setBulkValue({
      ...bulkValue,
      [e.target.name]: +e.target.value ? e.target.value : +e.target.value,
    });
  };

  // validation for IpAddress
  const validIpAddressRegex = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,3}$/;

  const submitAddBulkForm = async (e) => {
    e.preventDefault();
    const { count, dns, mtu, persistentKeepalive, endpointAllowedIPs } =
      bulkValue;
    if (count <= 0 || count >= 254) return toast.error("Bulk Count");
    if (!dns) return toast.error("Bulk Dns");
    if (!mtu) return toast.error("Bulk MTU");
    if (!persistentKeepalive) return toast.error("Persistent Keepalive");
    if (!endpointAllowedIPs || !validIpAddressRegex.test(endpointAllowedIPs))
      return toast.error("Endpoint Allowed IPs");

    setSubmitLoading(true);
    const InterfaceName = pathname.split("/")[2];
    console.log(InterfaceName);
    await PostPeerInterface(InterfaceName, {
      ...bulkValue,
    })
      .then((res) => {
        const { isSuccess } = res;
        if (isSuccess) {
          toast.success(res.message);
          router.back();
        } else {
          toast.error(res.message);
        }
      })
      .finally(() => {
        setSubmitLoading(false);
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
              className={`w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none ${bulkValue.count >= 254 || bulkValue.count < 0 ? "border-red-500" : ""}`}
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
              name="endpointAllowedIPs"
              defaultValue={bulkValue.endpointAllowedIPs}
              onChange={handleInputBulkValue}
              className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
            />
          </div>
          <div>
            <label className="mt-2 mb-1 block font-bold">DNS</label>
            <input
              type="text"
              name="dns"
              defaultValue={bulkValue.dns}
              onChange={handleInputBulkValue}
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
                name="mtu"
                defaultValue={bulkValue.mtu}
                onChange={handleInputBulkValue}
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="mt-2 mb-1 block font-bold">
                Persistent Keepalive
              </label>
              <input
                type="number"
                name="persistentKeepalive"
                defaultValue={bulkValue.persistentKeepalive}
                onChange={handleInputBulkValue}
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke px-3 py-2 outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button disabled={submitLoading}>
              <BsFillPlusCircleFill />
              Add
            </Button>
          </div>
        </form>
      </ConfigurationFormCard>
    </>
  );
};
