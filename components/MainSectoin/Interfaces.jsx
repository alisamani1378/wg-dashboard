"use client";
import { useEffect, useState } from "react";
import { InterfaceItem } from "./InterfaceItem";
import { GetInterface } from "@/api/interface";

export const Interfaces = () => {
  const [interfaces, setInterFaces] = useState();
  const [loading, setLoading] = useState(false);

  const fetchInterFace = () => {
    setLoading(true);
    GetInterface()
      .then((res) => {
        setInterFaces(res.interfaces);
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInterFace();
  }, []);

  return (
    <>
      {loading ? (
        <div>loading....</div>
      ) : (
        <>
          {interfaces ? (
            <>
              {interfaces.map((item) => {
                return <InterfaceItem key={item.id} interfaceDetail={item} />;
              })}
            </>
          ) : (
            <div className="w-full h-[480px] flex items-center justify-center border border-gray-500 rounded mt-4 text-2xl">
              Nothing Find!
            </div>
          )}
        </>
      )}
    </>
  );
};
