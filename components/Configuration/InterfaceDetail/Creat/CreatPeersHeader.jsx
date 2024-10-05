"use client";
import { useRouter } from "next/navigation";
import { BsChevronLeft } from "react-icons/bs";

export const CreatPeersHeader = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="w-fit flex items-center gap-4 justify-start text-[28px] font-bold cursor-pointer hover:text-secondary"
    >
      <BsChevronLeft />
      Add Peers
    </div>
  );
};
