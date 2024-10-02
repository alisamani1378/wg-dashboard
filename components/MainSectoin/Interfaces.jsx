"use client";
import { useEffect, useState } from "react";
import { InterfaceItem } from "./InterfaceItem";
import { GetInterface } from "@/api/interface";
import { ScaleLoader } from "react-spinners";

export const Interfaces = () => {
  const [interfaces, setInterFaces] = useState();
  const [loading, setLoading] = useState(true);

  const fetchInterFace = () => {
    GetInterface()
      .then((res) => {
        if (res.isSuccess) {
          setInterFaces(res.data);
        }
        console.log(res);
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
        <div className="w-full flex justify-center items-center h-[600px]">
          <ScaleLoader color="#fff" />
        </div>
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
