"use client";
import { useState, useEffect } from "react";
import { InterfaceDetailPeersCard } from "./InterfaceDetailPeersCard";
import { GetPeer } from "@/api/peer";
import toast from "react-hot-toast";

export const InterfaceDetailPeers = () => {
  const [peers, setPeers] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState({
    Take: 10,
    Skip: 0,
  });

  const fetchPeers = async (searchQuery) => {
    console.log(searchQuery);

    await GetPeer(searchQuery)
      .then((res) => {
        console.log(res);
        setPeers(res.data);
      })
      .catch((er) => {
        toast.error("Nothing Found");
        console.log(er);
      });
  };

  useEffect(() => {
    const searchQuery = `?Take=${filter.Take}&Skip=${
      filter.Skip
    }&InterfaceName=${location.pathname.split("/")[2]}`;

    fetchPeers(searchQuery);
  }, [currentPage]);

  const paginationNumber = Math.floor(peers?.countPeer / 10);
  const paginationArray = Array.from(
    { length: paginationNumber + 1 },
    (_, index) => index
  );

  const itemsPerPage = 6;
  let startPage = Math.max(0, currentPage - Math.floor(itemsPerPage / 2));
  let endPage = startPage + itemsPerPage - 1;

  if (endPage >= paginationNumber) {
    endPage = paginationNumber;
    startPage = Math.max(0, endPage - itemsPerPage + 1);
  }
  const handlePrevBTN = () => {
    setCurrentPage(currentPage - 1);
    setFilter({ ...filter, Skip: filter.Take * currentPage });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilter({
      ...filter,
      Skip: filter.Take * newPage, // به‌روزرسانی Skip با توجه به صفحه جدید
    });
  };

  return (
    <div className="w-full">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        <InterfaceDetailPeersCard />
        <InterfaceDetailPeersCard />
        <InterfaceDetailPeersCard />
        <InterfaceDetailPeersCard />
        <InterfaceDetailPeersCard />
        <InterfaceDetailPeersCard />
      </div> */}

      {/* this is pagination */}
      <div className="flex justify-center items-center mt-5">
        <div className="join">
          <>
            <button
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
              className="join-item btn bg-primary text-secondary hover:bg-primaryLight disabled:bg-primaryLight"
            >
              «
            </button>
            {paginationArray.slice(startPage, endPage + 1).map((pageNumber) => {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`join-item btn bg-primary text-secondary hover:bg-primaryLight ${
                    pageNumber === currentPage
                      ? "btn-active bg-secondary !text-primary hover:bg-secondary"
                      : ""
                  }`}
                >
                  {pageNumber + 1}
                </button>
              );
            })}
            <button
              disabled={currentPage === paginationNumber}
              onClick={() => handlePageChange(currentPage + 1)}
              className="join-item btn bg-primary text-secondary hover:bg-primaryLight disabled:bg-primaryLight"
            >
              »
            </button>
          </>
        </div>
      </div>
    </div>
  );
};
