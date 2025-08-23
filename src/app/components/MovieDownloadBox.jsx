import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuCalendar, LuArrowUp, LuArrowDown } from "react-icons/lu";
import { TbDownload } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

import { ytsUrl, formatBytes, ytsToMagnet, monthNames } from "@/lib/utils";
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
      className={`transition-all fixed z-40 top-0 left-0 h-screen max-h-screen w-screen`}
    >
      <div className="pt-24 pb-0 p-1  w-full h-full backdrop-blur-md bg-black/50">
        <div className="bg-black/85 flex flex-col gap-2 p-4 overflow-scroll scrollbar-hidden backdrop-blur-lg w-full h-full rounded-t-[30px]">
          <div className="flex p-[2px] justify-between">
            <div className="p-2 rounded-full text-gray-400 khover:bg-gray-900/40 w-1/5">
              <div className="px-2 text-nowrap">Torrents</div>
            </div>

            <div
              onClick={() => setDownloadBox(false)}
              className="p-2 rounded-full hover:bg-gray-900/70 transition-all"
            >
              <MdOutlineClose size={25} />
            </div>
          </div>

          <div className="w-full flex-1 flex lg:flex-row flex-col gap-3 overflow-scroll scrollbar-hidden">
            <div className="lg:w-auto w-full lg:flex-1 lg:h-full aspect-video lg:aspect-auto">
              <div className="w-full h-full rounded-[30px] overflow-hidden">
                {selectedStream ? (
                  <StreamBox magnetUri={selectedStream} />
                ) : (
                  <div className="h-full w-full flex items-center justify-center lg:text-2xl text-lg bg-black text-gray-400/70">
                    Select torrent to stream
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-[500px] w-full h-full overflow-scroll scrollbar-hidden backdrop-blur-xl appear flex flex-col p-5 sm:px-5 px-3 gap-3 transition-all items-center rounded-[30px] bg-gray-950/70">
              <div className="flex relative items-baseline pl-4 w-full gap-4">
                <div
                  onClick={() => setSelectedApi("tpb")}
                  className={`text-white flex gap-2 items-center text-sm p-2 px-6 transition-all rounded-2xl hover:bg-gray-800/60 ${selectedApi === "tpb" ? "bg-gray-800/70" : " bg-gray-800/30"}`}
                >
                  {/** <Image src={tpbIcon} alt="TPB Icon" width={20} height={20} className="rounded-full size-5" /> */}
                  TPB
                </div>
                <div
                  onClick={() => setSelectedApi("yts")}
                  className={`text-white flex gap-2 text-sm items-center transition-all p-2 px-6 rounded-2xl hover:bg-gray-800/60 ${selectedApi === "yts" ? "bg-gray-800/70" : "bg-gray-800/30"}`}
                >
                  {/*<Image src={ytsIcon} alt="YTS Icon" width={20} height={20} className="rounded-full size-5" /> */}
                  YTS
                </div>
              </div>
              <div className="flex relative flex-1 overflow-scroll scrollbar-hidden gap-3 w-full h-full">
                {loading ? (
                  <div>loading</div>
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  <div className="flex flex-col w-full h-full">
                    <div className="text-white/70 text-sm p-3 pl-6">
                      Available Torrents From {selectedApi.toUpperCase()}
                    </div>
                    <div className="flex flex-col w-full h-full overflow-scroll scrollbar-hidden gap-3 px-1 rounded-[30px]">
                      {downloadList.length > 0 ? (
                        downloadList.map((item, index) => (
                          <div
                            key={index}
                            className="flex w-full gap-2 items-center rounded-3xl bg-gray-800/10"
                          >
                            <div className="flex flex-1 w-full gap-3 p-2  transition-all px-4 bg-gray-800/30j jhover:bg-gray-800/60 rounded-full">
                              <div className="flex flex-col w-full gap-[7px] overflow-scroll scrollbar-hidden">
                                <div className="p-1 px-3 rounded-full bg-gray-800/20 text-gray-400 text-xs w-max">
                                  {monthNames[
                                    parseInt(item.date.split("-")[0]) - 1
                                  ] +
                                    " " +
                                    item.date.split("-")[2]}
                                </div>

                                <div className=" text-xs sm:text-base w-full text-nowrap overflow-scroll scrollbar-hidden">
                                  {`${item.title}${item.quality && item.type ? ` (${item.quality} ${item.type})` : ""}`}
                                </div>

                                <div className="flex gap-3 w-full justify-between overflow-scroll scrollbar-hidden text-xs text-gray-400">
                                  <div className="flex gap-3 items-start">
                                    <div className="flex items-center text-nowrap gap-1">
                                      <TbDownload />
                                      <div>{item.size}</div>
                                    </div>
                                    <div className="flex  itext-green-500 text-nowrap items-center gap-1">
                                      <LuArrowUp />
                                      <div>Seeders {item.seeds}</div>
                                    </div>
                                    <div className="flex  ktext-red-500 text-nowrap items-center gap-1">
                                      <LuArrowDown />
                                      <div>Peers {item.peers}</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex gap-3 w-full justify-end mt-1 overflow-scroll scrollbar-hidden text-xs text-gray-400">
                                  <div className="flex gap-2 text-sm">
                                    <Link
                                      href={item.downloadLink}
                                      className="flex p-2 px-5 gap-3 items-center justify-center h-full bg-gray-800/30 hover:bg-gray-800/60 rounded-full cursor-pointer"
                                    >
                                      <LiaDownloadSolid size={23} />
                                      <div className="">Download</div>
                                    </Link>

                                    <div
                                      onClick={() =>
                                        setSelectedStream(item.downloadLink)
                                      }
                                      className="flex p-2 px-5 gap-3 items-center justify-center h-full bg-gray-800/30 hover:bg-gray-800/60 rounded-full cursor-pointer"
                                    >
                                      <FaPlay size={16} />
                                      <div className="">Stream</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-white">No downloads available</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
