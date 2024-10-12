"use client";
import { BsList } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export const HamburgerMenu = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  const handleOpenModal = () => {
    setShowSideBar(true);
    document.getElementById("my_modal_2").showModal();
  };

  const handleCloseModal = () => {
    setShowSideBar(false);
    document.getElementById("my_modal_2").close();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        handleCloseModal();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        className="block md:hidden btn !w-[38px] !min-h-[38px] h-[38px] !bg-transparent !text-secondary !p-1 cursor-pointer border border-transparent  hover:border hover:border-secondary hover:rounded-xl transition-all duration-200"
        onClick={handleOpenModal}
      >
        <BsList className="text-[28px] md:hidden" />
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box min-h-[480px]">
          <Sidebar visible={showSideBar} closeModal={handleCloseModal} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleCloseModal}>close</button>
        </form>
      </dialog>
    </>
  );
};
