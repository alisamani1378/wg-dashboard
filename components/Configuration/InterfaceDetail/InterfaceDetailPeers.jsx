"use client";
import { useEffect, useState } from "react";
import { GetPeer } from "@/api/peer";
import toast from "react-hot-toast";
import { InterfaceDetailPeersCard } from "@/components/Configuration/InterfaceDetail/InterfaceDetailPeersCard";
import { ScaleLoader } from "react-spinners";

export const InterfaceDetailPeers = () => {
  const [peers, setPeers] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState({
    Take: 10,
    Skip: 0,
  });
  const [peerLoading, setPeerLoading] = useState(true);

  const fetchPeers = async (searchQuery) => {
    console.log(searchQuery);
    setPeerLoading(true);
    await GetPeer(searchQuery)
      .then((res) => {
        console.log(res);
        setPeers(res.data);
      })
      .catch((er) => {
        toast.error("Nothing Found");
        console.log(er);
      })
      .finally(() => {
        setPeerLoading(false);
      });
  };

  useEffect(() => {
    const searchQuery = `?Take=${filter.Take}&Skip=${
      filter.Skip
    }&InterfaceName=${location.pathname.split("/")[2]}`;

    fetchPeers(searchQuery);
  }, [currentPage, filter.Skip, filter.Take]);

  const paginationNumber = Math.floor(peers?.countPeer / 10);
  const paginationArray = Array.from(
    { length: paginationNumber + 1 },
    (_, index) => index,
  );

  const itemsPerPage = 5;
  let startPage = Math.max(0, currentPage - Math.floor(itemsPerPage / 2));
  let endPage = startPage + itemsPerPage - 1;

  if (endPage >= paginationNumber) {
    endPage = paginationNumber;
    startPage = Math.max(0, endPage - itemsPerPage + 1);
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilter({
      ...filter,
      Skip: filter.Take * newPage, // به‌روزرسانی Skip با توجه به صفحه جدید
    });
  };

  return (
    <div className="w-full">
      {peerLoading ? (
        <div className="text-center w-full h-[360px] flex justify-center items-center">
          <ScaleLoader color="#fff" />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between p-4 bg-primaryLight shadow mb-4 border border-primaryLight rounded-md">
            <span className="col-span-3">PeerName</span>
            <span className="col-span-1 text-center">Id</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {peers?.peers.map((peer) => {
              return (
                <>
                  <InterfaceDetailPeersCard peerDetail={peer} />
                </>
              );
            })}
          </div>
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
                {paginationArray
                  .slice(startPage, endPage + 1)
                  .map((pageNumber) => {
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
        </>
      )}
    </div>
  );
};
