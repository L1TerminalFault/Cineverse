import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuCalendar, LuArrowUp, LuArrowDown } from "react-icons/lu";
import { TbDownload } from "react-icons/tb";

import { ytsUrl, formatBytes } from "@/lib/utils";
import ytsIcon from "@/../../public/yts.png";
import tpbIcon from "@/../../public/tpb.png";

export default function ({ movieDetail, downloadBox, setDownloadBox }) {
  const [downloadList, setDownloadList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedApi, setSelectedApi] = useState("tpb");

  const fetchDownloadData = async () => {
    setError(null);
    setLoading(true);
    const endpoint =
      selectedApi === "yts"
        ? ytsUrl(movieDetail.imdb_id)
        : selectedApi === "tpb"
          ? `/api/getTorrentTPB?imdb_id=${movieDetail.imdb_id}`
          : null;
    try {
      const response = await (await fetch(endpoint)).json();
      if (selectedApi === "yts") {
        if (response.status === "ok" && response.data.movie_count) {
          setDownloadList(
            response.data.movies[0].torrents.map((torrent) => ({
              title: movieDetail.title,
              quality: torrent.quality,
              type: torrent.type,
              size: torrent.size,
              downloadLink: torrent.url,
              seeds: torrent.seeds,
              peers: torrent.peers,
              date: new Date(torrent.date_uploaded_unix * 1000)
                .toLocaleDateString()
                .replaceAll("/", "-"),
            })),
          );
        } else {
          setError("Couldn't find any downloads for this movie.");
        }
      } else if (selectedApi === "tpb") {
        if (response.ok) {
          if (
            response.response[0].name === "No results returned" &&
            response.response[0].id === "0"
          ) {
            setDownloadList([]);
            return;
          }
          setDownloadList(
            response.response.map((item) => ({
              title: item.name,
              size: formatBytes(item.size),
              //https://thepiratebay.org/torrent/${item.id}
              downloadLink: `magnet:?xt=urn:btih:${item.info_hash}&dn=${encodeURIComponent(item.name)}`,
              seeds: item.seeders,
              peers: item.leechers,
              date: new Date(item.added * 1000)
                .toLocaleDateString()
                .replaceAll("/", "-"),
            })),
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
      onClick={() => setDownloadBox(false)}
      className={`transition-all fixed z-40 top-0 left-0 h-screen w-screen`}
    >
      <div className="flex flex-col z-50 items-center justify-center w-full h-full backdrop-blur-md bg-black/50">
        <div className="flex h-full w-full gap-2 items-center justify-center">
          <div className="flex flex-col gap-3 items-center justify-center max-w-[1000px] w-full p-6 lg:p-16 pt-0">
            <div className="flex w-full justify-between p-4 pt-0">
              <div></div>

              <BsChevronLeft size={30} />
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full h-[calc(100vh*0.6)] appear flex flex-col p-5 gap-3 transition-all items-center overflow-hidden rounded-[30px] bg-gray-950/90"
            >
              {" "}
              <div className="flex items-baseline justify-center w-full gap-4">
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
              <div className="w-full">
                {loading ? (
                  <div>loading</div>
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  <div className="flex flex-col w-full gap-2 p-3 rounded-[30px] overflow-y-scroll scrollbar-hidden">
                    {downloadList.length > 0 ? (
                      downloadList.map((item, index) => (
                        <Link
                          href={item.downloadLink}
                          key={index}
                          className="flex items-center w-full gap-3 p-3 px-5 bg-gray-800/30 hover:bg-gray-800/60 rounded-full"
                        >
                          <LiaDownloadSolid size={30} />

                          <div className="flex flex-col gap-[7px]">
                            <div className="overflow-scroll scrollbar-hidden text-sm">
                              {`${item.title}${item.quality && item.type ? ` (${item.quality} ${item.type})` : ""}`}
                            </div>

                            <div className="flex gap-3 items-center text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <LuCalendar />
                                <div>{item.date}</div>
                              </div>
                              <div className="flex text-green-500 items-center gap-1">
                                <LuArrowUp />
                                <div>Seeders {item.seeds}</div>
                              </div>
                              <div className="flex text-red-500 items-center gap-1">
                                <LuArrowDown />
                                <div>Peers {item.peers}</div>
                              </div>
                              <div className="flex items-center gap-1">
                                <TbDownload />
                                <div>{item.size}</div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-white">No downloads available</p>
                    )}
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
