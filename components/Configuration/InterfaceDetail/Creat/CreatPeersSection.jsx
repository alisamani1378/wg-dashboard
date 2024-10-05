"use client";
import { useState } from "react";
import { CreatPeersSectionAddBulkForm } from "./CreatPeersSectionAddBulkForm";
import { CreatPeersSectionOptionalForm } from "./CreatPeersSectionOptionalForm";

export const CreatPeersSection = () => {
  const [isCheckBulkAdd, setIsCheckBulkAdd] = useState(true);

  return (
    <>
      <div className="my-8">
        <label className="label cursor-pointer justify-normal gap-6">
          <input
            type="checkbox"
            value={isCheckBulkAdd}
            onChange={() => setIsCheckBulkAdd((prev) => !prev)}
            className="toggle toggle-sm checked:border-blue-500 checked:bg-blue-500  checked:hover:bg-blue-700"
          />
          <span className="label-text font-semibold text-white">Bulk Add</span>
        </label>
        <p className="text-sm text-secondary">
          By adding peers by bulk, each peer&apos;s name will be auto generated,
          and Allowed IP will be assign to the next available IP.
        </p>
      </div>
      {!isCheckBulkAdd ? (
        <>
          <CreatPeersSectionAddBulkForm />
        </>
      ) : (
        <>
          <CreatPeersSectionOptionalForm />
        </>
      )}
    </>
  );
};
