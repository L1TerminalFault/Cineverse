import { useEffect, useState } from "react";
import Image from "next/image";
import { BsChevronLeft } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { HiMiniBars3, HiMiniBars2 } from "react-icons/hi2";

import { ytThumbnail } from "@/lib/utils";

export default function ({ movieId, trailerBox, setTrailerBox }) {
  const [trailerList, setTrailerList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [expand, setExpand] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchTrailerData = async () => {
    setLoading(true);
    try {
      const response = await (
        await fetch(`/api/getMovieInfo?id=${movieId}&type=trailer`)
      ).json();
      if (response.ok) {
        const results = response.response.results;
        if (results && results.length > 0) {
          const trailers = results
            .filter(
              (video) =>
                video.type === "Trailer" ||
                video.type === "Teaser" ||
                (video.type === "Clip" &&
                  video.site === "YouTube" &&
                  !video.name.toLowerCase().includes("vertical") &&
                  video.official),
            )
            .sort((a, b) => {
              if (a.type === "Trailer" && b.type !== "Trailer") return -1;
              if (b.type === "Trailer" && a.type !== "Trailer") return 1;
              if (a.type === "Teaser" && b.type !== "Teaser") return -1;
              if (b.type === "Teaser" && a.type !== "Teaser") return 1;
              return 0;
            });

          setTrailerList(trailers);
          setSelectedTrailer(trailers[0]);
          // const trailers = results.filter(
          //  (video) =>
          //    video.type === "Trailer" &&
          //    video.site === "YouTube" &&
          //    !video.name.toLowerCase().includes("vertical") &&
          //    video.official,
          //);
          //const hdTrailer = trailers.filter((video) => video.size === 1080);
          //const trailer = hdTrailer[0] || trailers[0] || results[0];
          // console.log(hdTrailer);

          //if (trailer) {
          //  setTrailerList(trailer);
          //} else {
          //  setError("No trailer found");
          //}
        } else {
          setError("No videos available for this movie");
        }
      } else throw Error(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailerData();
  }, []);

  return (
    <div
      onClick={() => setTrailerBox(false)}
      className={`transition-all fixed z-40 top-0 left-0 h-screen w-screen`}
    >
      <div className="flex flex-col z-50 items-center justify-center w-full h-full backdrop-blur-md bg-black/50">
        <div className="flex h-full w-full gap-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center max-h-[calc(100vh*8/9)] max-w-[1700px] w-full p-6 lg:p-16 pt-0">
            <div className="flex w-full justify-between p-4 pt-0">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setExpand((prev) => !prev);
                }}
                className="p-2 rounded-full hover:bg-gray-400/30 transition-all cursor-pointer"
              >
                {expand ? <HiMiniBars3 size={30} /> : <HiMiniBars2 size={30} />}
              </div>

              <BsChevronLeft size={30} />
            </div>

            {loading ? (
              <div className="aspect-video appear flex transition-all items-center overflow-hidden justify-center rounded-[30px] w-full h-full bg-black">
                <div className="bg-gray-100 rounded-full p-1 bg-gradient-to-br from-white to-white via-gray-900 animate-spin">
                  <div className="bg-black rounded-full p-5"></div>
                </div>
              </div>
            ) : error ? null : (
              <div className="relative flex overflow-y-scroll z-10 rounded-[30px] scrollbar-hidden gap-3 w-full h-full">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`absolute max-h-72 z-20 lg:max-h-96 max-w-[550px] top-2 left-2 ${expand ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-96"} shadow-black shadow-all transition-all overflow-x-hidden rounded-3xl bg-gray-950/70 scrollbar-hidden backdrop-blur-xl overflow-y-scroll`}
                >
                  <div className=" flex flex-col gap-3 p-[10px] justify-center">
                    {trailerList.map((trailer) => (
                      <div
                        key={trailer.key}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpand(false);
                          setSelectedTrailer(trailer);
                        }}
                        className={`flex gap-2 items-center p-2 px-4 rounded-[20px] ${selectedTrailer.key === trailer.key ? "bg-gray-600/50" : ""} hover:bg-gray-600/50 transition-all cursor-pointer`}
                      >
                        <Image
                          key={retryCount}
                          onError={() =>
                            setRetryCount((prev) =>
                              prev < 3 ? prev + 1 : prev,
                            )
                          }
                          src={ytThumbnail(trailer.key)}
                          alt=""
                          width={64}
                          height={36}
                          className="rounded-md"
                        />
                        <div className="flex-1 text-white text-sm">
                          {trailer.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex w-full max-w-[1700px] max-h-[calc(100vh*8/9)] h-full rounded-[30px]">
                  <iframe
                    className="bg-black flex-1 h-full max-h-[calc(100vh*8/9)] w-full aspect-video rounded-[30px]"
                    src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=0&mute=0&controls=1&modestbranding=1&rel=0&showinfo=1`}
                    title={selectedTrailer.name}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
