"use client";
import { useEffect, useRef, useState } from "react";
import { GetPeer } from "@/api/peer";
import toast from "react-hot-toast";
import { InterfaceDetailPeersCard } from "@/components/Configuration/InterfaceDetail/InterfaceDetailPeersCard";
import { ScaleLoader } from "react-spinners";
import { BsSearch } from "react-icons/bs";
import { FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import { usePathname } from "next/navigation";

export const InterfaceDetailPeers = () => {
  const [peers, setPeers] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState({
    Take: 20,
    Skip: 0,
    name: "",
  });
  const [peerLoading, setPeerLoading] = useState(true);

  const searchNameRef = useRef();

  const pathname = usePathname();

  const fetchPeers = async (searchQuery) => {
    setPeerLoading(true);

    await GetPeer(searchQuery)
      .then((res) => {
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
    }&InterfaceName=${pathname.split("/")[2]}&name=${filter.name}`;

    fetchPeers(searchQuery);
  }, [currentPage, filter.Skip, filter.Take, filter.name]);

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
      Skip: filter.Take * newPage,
    });
  };

  const handleSearchPeer = (e) => {
    e.preventDefault();
    const searchValue = searchNameRef.current.value;

    if (searchValue) {
      setFilter({ ...filter, name: searchValue });
    } else {
      setFilter({
        Take: 20,
        Skip: 0,
        name: "",
      });
    }
  };

  return (
    <div className="w-full">
      {peerLoading ? (
        <div className="text-center w-full h-[360px] flex justify-center items-center">
          <ScaleLoader color="#fff" />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-between items-center gap-4  mb-4">
            <form onSubmit={handleSearchPeer} className="relative flex-1">
              <input
                name="searchparam"
                ref={searchNameRef}
                type="text"
                defaultValue={filter.name}
                placeholder="Search"
                className="w-full bg-transparent rounded-lg border border-[#666666] border-stroke pl-2 pr-12 py-2 outline-none "
              />
              <button className="btn btn-square btn-outline btn-sm absolute right-2 top-[5px] bg-transparent hover:bg-primaryLight hover:text-secondary border !border-primaryLight text-primaryLight">
                <BsSearch />
              </button>
            </form>
            <div className="flex items-center gap-2">
              <span
                onClick={() => setFilter({ ...filter, Take: 20 })}
                className="w-[42px] h-[42px] flex justify-center items-center bg-primaryLight border border-secondary rounded-lg hover:bg-primary cursor-pointer transition-all duration-75"
              >
                <FaSortAmountDownAlt />
              </span>
              <span
                onClick={() => setFilter({ ...filter, Take: 40 })}
                className="w-[42px] h-[42px] flex justify-center items-center bg-primaryLight border border-secondary rounded-lg hover:bg-primary cursor-pointer transition-all duration-75"
              >
                <FaSortAmountUp />
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-secondary">
            {peers?.peers.map((peer) => {
              return (
                <InterfaceDetailPeersCard key={peer.id} peerDetail={peer} />
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
                  className="join-item btn bg-primary text-secondary hover:bg-primaryLight disabled:bg-primaryLight disabled:text-secondary"
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
                  className="join-item btn bg-primary text-secondary hover:bg-primaryLight disabled:bg-primaryLight disabled:text-secondary"
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
