import { use, useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";

import { ytsUrl, thepiratebayUrl } from "@/lib/utils";

export default function ({ movieDetail, downloadBox, setDownloadBox }) {
  const [downloadList, setDownloadList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedApi, setSelectedApi] = useState("tpb");

  const fetchDownloadData = async () => {
    setLoading(true);
    const endpoint = selectedApi === "yts" ? ytsUrl(movieDetail.imdb_id) : selectedApi === "tpb" ? `/api/getTorrentTPB?imdb_id=${movieDetail.imdb_id}` : null;
    try {
      const response = await (await fetch(endpoint)).json();
console.log(response);
      if (selectedApi === "yts") {
        if (response.status === "ok" && response.data.movie_count) {
          setDownloadList(response.data.movies[0].torrents.map(torrent => ({
          title: `${movieDetail.title} - ${torrent.quality} (${torrent.type})`,
          size: torrent.size,
          downloadLink: torrent.url,
            seeds: torrent.seeds,
            peers: torrent.peers,
            date: new Date(torrent.date_uploaded_unix * 1000).toLocaleDateString(),
          })));
        } else {
          setError("Couldn't find any downloads for this movie.");
        }
      } else if (selectedApi === "tpb") {
        if (response.ok && response.response.length) {
          setDownloadList(response.response.map(item => ({
          title: item.name,
          size: item.size,
          downloadLink: `https://thepiratebay.org/torrent/${item.id}`,
          seeds: item.seeders,
          peers: item.leechers,
          date: new Date(item.added * 1000).toLocaleDateString(),
                    })));
        } else {
          setError("Couldn't find any downloads for this movie.");
        }

      }
    } catch (error) {
      setError(error)
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

            <div onClick={(e) => e.stopPropagation()} className="w-full h-[calc(100vh*0.6)] appear flex flex-col p-5 gap-3 transition-all items-center overflow-hidden rounded-[30px] bg-gray-950/90"> <div className="flex items-baseline justify-center w-full gap-4">
                <div onClick={() => setSelectedApi("tpb")} className="text-white text-sm p-1 px-4 rounded-xl bg-gray-800">
                  TPB
                </div>
                <div onClick={() => setSelectedApi("yts")} className="text-white text-sm p-1 px-4 rounded-xl bg-gray-800">
                  YTS
                </div>
                <div className="text-white text-sm p-1 px-4 rounded-xl bg-gray-800">
                  BitTorrent
                </div>
                  
              </div>

              <div className="flex flex-col w-full gap-2 p-3 rounded-[30px] overflow-y-scroll scrollbar-hidden">
                {loading ? (
                  <div></div>
                ) : error ? null : (
                    <div>
                    {downloadList.length > 0 ? (
                      downloadList.map((item, index) => (
                        <div key={index} className="flex flex-col p-3 bg-gray-800 rounded-lg">
                          <h3 className="text-white text-lg">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.size}</p>
                          <a href={item.downloadLink} className="text-blue-500 hover:underline">Download</a>
                        </div>
                      ))
                                          ) : (
                      <p className="text-white">No downloads available</p>
                    )}</div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
