import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuCalendar, LuArrowUp, LuArrowDown } from "react-icons/lu";
import { TbDownload } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";

import { ytsUrl, formatBytes, ytsToMagnet } from "@/lib/utils";
import ytsIcon from "@/../../public/yts.png";
import tpbIcon from "@/../../public/tpb.png";
import StreamBox from "./StreamBox";
import { HiMiniBars2, HiMiniBars3 } from "react-icons/hi2";

export default function ({ movieDetail, downloadBox, setDownloadBox }) {
  const [downloadList, setDownloadList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedApi, setSelectedApi] = useState("tpb");
  const [selectedStream, setSelectedStream] = useState(null);
  const [expand, setExpand] = useState(false);

  const fetchDownloadData = async () => {
    setError(null);
    setLoading(true);
    const endpoint =
      selectedApi === "yts"
        ? ytsUrl(movieDetail.imdb_id ? movieDetail.imdb_id : movieDetail.title)
        : selectedApi === "tpb"
          ? `/api/getTorrentTPB?q=${movieDetail.imdb_id ? movieDetail.imdb_id : movieDetail.title}&type=movies`
          : null;
    try {
      const response = await (await fetch(endpoint)).json();
      if (selectedApi === "yts") {
        if (response.status === "ok" && response.data.movie_count) {
          setDownloadList(
            response.data.movies[0].torrents
              .map((torrent) => ({
                title: movieDetail.title,
                quality: torrent.quality,
                type: torrent.type,
                size: torrent.size,
                downloadLink: ytsToMagnet(torrent.url),
                seeds: torrent.seeds,
                peers: torrent.peers,
                date: new Date(torrent.date_uploaded_unix * 1000)
                  .toLocaleDateString()
                  .replaceAll("/", "-"),
              }))
              .sort((a, b) => b.seeds - a.seeds),
          );
        } else {
          setError("Couldn't find any downloads for this movie.");
        }
      } else if (selectedApi === "tpb") {
        if (response.ok) {
          if (!response.response.length) {
            setDownloadList([]);
            return;
          }
          setDownloadList(
            response.response
              .map((item) => ({
                title: item.name,
                size: formatBytes(item.size),
                //https://thepiratebay.org/torrent/${item.id}
                downloadLink: `magnet:?xt=urn:btih:${item.info_hash}&dn=${encodeURIComponent(item.name)}`,
                seeds: item.seeders,
                peers: item.leechers,
                date: new Date(item.added * 1000)
                  .toLocaleDateString()
                  .replaceAll("/", "-"),
              }))
              .sort((a, b) => b.seeds - a.seeds),
          );
        } else {
          setError("Couldn't find any downloads for this movie.");
        }
      }
    } catch (error) {
      setError(error);
      console.error("Error downloading movie:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDownloadData();
  }, [selectedApi]);

  return (
    <div
      onClick={() => {
        if (!selectedStream) setDownloadBox(false);
      }}
      className={`transition-all fixed z-40 top-0 left-0 h-screen w-screen`}
    >
      <div className="flex flex-col z-50 items-center justify-center w-full h-full backdrop-blur-md bg-black/50">
        <div className="flex h-full w-full gap-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full p-3 sm:p-6 lg:p-16 pt-0">
            <div
              className={`flex w-full justify-between p-4 pt-0 ${selectedStream ? "opacity-100" : "opacity-0"}`}
            >
              <div>
                {selectedStream ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpand((prev) => !prev);
                    }}
                    className="p-2 rounded-full hover:bg-gray-400/30 transition-all cursor-pointer"
                  >
                    {expand ? (
                      <HiMiniBars3 size={30} />
                    ) : (
                      <HiMiniBars2 size={30} />
                    )}
                  </div>
                ) : null}
              </div>

              <div
                onClick={() => setDownloadBox(false)}
                className="p-2 rounded-full hover:bg-gray-400/30 transition-all cursor-pointer"
              >
                <BsChevronLeft size={30} className="" />
              </div>
            </div>

            <div className="flex relative gap-5 w-full md:h-[calc(100vh*0.8)] h-[calc(100vh*0.6)] items-center justify-center">
              <div
                onClick={(e) => e.stopPropagation()}
                className={`${selectedStream ? `md:w-2/5 w-[85%] top-2 left-2 md:h-2/3 h-[80%] ${expand ? "translate-x-0 opacity-100" : "-translate-x-[1000px] opacity-0"} ` : "md:left-auto md:top-auto md:w-1/2 md:h-2/3 w-full h-full"} z-10 absolute backdrop-blur-3xl appear flex flex-col p-5 sm:px-5 px-3 gap-3 transition-all items-center overflow-hidden rounded-[30px] bg-gray-950/70`}
              >
                <div className="flex relative items-baseline justify-center w-full gap-4">
                  <div
                    onClick={() => setSelectedApi("tpb")}
                    className={`text-white flex gap-2 items-center text-sm p-2 px-5 transition-all rounded-full hover:bg-gray-800/60 ${selectedApi === "tpb" ? "bg-gray-800/70" : " bg-gray-800/30"}`}
                  >
                    <Image
                      src={tpbIcon}
                      alt="TPB Icon"
                      width={20}
                      height={20}
                      className="rounded-full size-5"
                    />
                    TPB
                  </div>
                  <div
                    onClick={() => setSelectedApi("yts")}
                    className={`text-white flex gap-2 text-sm items-center transition-all p-2 px-5 rounded-full hover:bg-gray-800/60 ${selectedApi === "yts" ? "bg-gray-800/70" : "bg-gray-800/30"}`}
                  >
                    <Image
                      src={ytsIcon}
                      alt="YTS Icon"
                      width={20}
                      height={20}
                      className="rounded-full size-5"
                    />
                    YTS
                  </div>
                </div>
                <div className="flex relative gap-3 w-full h-full pb-5">
                  {loading ? (
                    <div>loading</div>
                  ) : error ? (
                    <div>{error}</div>
                  ) : (
                    <div className="flex flex-col h-full w-full">
                      <div className="text-white/70 text-sm p-3 pl-6">
                        Available Torrents From {selectedApi.toUpperCase()}
                      </div>
                      <div className="overflow-scroll scrollbar-hidden w-full h-full">
                        <div className="flex flex-col w-full h-full overflow-scroll scrollbar-hidden gap-3 px-1 pb-5 rounded-[30px]">
                          {downloadList.length > 0 ? (
                            downloadList.map((item, index) => (
                              <div
                                key={index}
                                className="flex w-full gap-2 items-center rounded-3xl bggray800/5"
                              >
                                <div className="flex flex-1 w-full items-center gap-3 p-2  transition-all px-4 bg-gray-800/30j jhover:bg-gray-800/60 rounded-full">
                                  <div className="flex flex-col w-full gap-[7px] overflow-scroll scrollbar-hidden">
                                    <div className=" text-xs sm:text-sm w-full text-nowrap overflow-scroll scrollbar-hidden">
                                      {`${item.title}${item.quality && item.type ? ` (${item.quality} ${item.type})` : ""}`}
                                    </div>

                                    <div className="flex gap-3 w-full items-center justify-between overflow-scroll scrollbar-hidden text-xs text-gray-400">
                                      <div className="flex items-center text-nowrap gap-1">
                                        <TbDownload />
                                        <div>{item.size}</div>
                                      </div>
                                      {/*<div className="sm:flex hidden text-green-500 text-nowrap items-center gap-1">
                                        <LuArrowUp />
                                        <div>Seeders {item.seeds}</div>
                                      </div>
                                      <div className="sm: hidden text-red-500 text-nowrap items-center gap-1">
                                        <LuArrowDown />
                                        <div>Peers {item.peers}</div>
                                      </div>*/}
                                      <div className="flex items-center text-gray-500 text-nowrap gap-1">
                                        <div>{item.date}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <Link
                                  href={item.downloadLink}
                                  className="flex p-2 sm:px-6 gap-3 items-center justify-center h-full bg-gray-800/30 hover:bg-gray-800/60 rounded-full cursor-pointer"
                                >
                                  <LiaDownloadSolid size={30} />
                                  <div className="sm:inline hidden">
                                    Download
                                  </div>
                                </Link>

                                <div
                                  onClick={() =>
                                    setSelectedStream(item.downloadLink)
                                  }
                                  className="flex p-[18px] sm:px-6 gap-3 items-center justify-center h-full bg-gray-800/30 hover:bg-gray-800/60 rounded-full cursor-pointer"
                                >
                                  <FaPlay />
                                  <div className="sm:inline hidden">Stream</div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-white">No downloads available</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div
                onClick={(e) => {
                  if (selectedStream) e.stopPropagation();
                }}
                className={`${selectedStream ? "opacity-100" : "opacity-0"} w-full bg-black rounded-[30px] flex items-center justify-center transition-all h-full overflow-hidden`}
              >
                {selectedStream ? (
                  <StreamBox magnetUri={selectedStream} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
