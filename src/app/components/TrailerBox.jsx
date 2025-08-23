import { useEffect, useState } from "react";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { HiMiniBars3, HiMiniBars2 } from "react-icons/hi2";

import { ytThumbnail } from "@/lib/utils";

export default function ({ movieId, trailerBox, setTrailerBox }) {
  const [trailerList, setTrailerList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expand, setExpand] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
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
              if (
                a.name === "Official Trailer" &&
                b.name !== "Official Trailer"
              )
                return -1;
              if (a.type === "Trailer" && b.type !== "Trailer") return -1;
              if (b.type === "Trailer" && a.type !== "Trailer") return 1;
              if (a.type === "Teaser" && b.type !== "Teaser") return -1;
              if (b.type === "Teaser" && a.type !== "Teaser") return 1;
              return 0;
            });

          setTrailerList(trailers);
          setSelectedTrailer(trailers[0]);
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
      className={`transition-all fixed z-40 top-0 left-0 h-screen max-h-screen w-screen`}
    >
      <div className="pt-24 w-full h-full p-1 pb-0 backdrop-blur-md bg-black/50">
        <div className="bg-black/85 flex flex-col gap-2 p-4 backdrop-blur-lg w-full h-full rounded-t-[30px]">
          <div className="flex p-[2px] justify-between">
            <div className="p-2 rounded-full text-gray-400 khover:bg-gray-900/40 w-1/5">
              <div className="px-2 text-nowrap">Trailers and Teasers</div>
            </div>

            <div
              onClick={() => setTrailerBox(false)}
              className="p-2 rounded-full hover:bg-gray-900/70 transition-all"
            >
              <MdOutlineClose size={25} />
            </div>
          </div>

          <div className="w-full h-full flex lg:flex-row flex-col gap-3">
            <div className="lg:flex-1 w-full">
              {loading ? (
                <div className="bg-gray-900/10 relative overflow-hidden max-h-[calc(100vh*4/5)] aspect-video w-full rounded-[30px]">
                  <div className="absolute swipe inset-0 bg-gradient-to-l from-transparent via-gray-900/60 to-transparent"></div>
                </div>
              ) : (
                <div className=" w-full">
                  <iframe
                    className="bg-black max-h-[calc(100vh*4/5)] w-full aspect-video rounded-[30px]"
                    src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=0&mute=0&controls=1&modestbranding=1&rel=0&showinfo=1`}
                    title={selectedTrailer.name}
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            <div className="lg:w-96 w-full h-full overflow-hidden">
              <div className="rounded-3xl bg-gray-900/30 w-full h-[90%] backdrop-blur-3xl p-2 overflow-scroll scrollbar-hidden">
                <div className=" flex flex-col h-full overflow-scroll scrollbar-hidden gap-3 p-[10px] justify-center">
                  {loading ? (
                    <div className="rounded-3xl h-full w-full flex flex-col gap-2 overflow-scroll scrollbar-hidden">
                      {[
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17,
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-3xl bg-gray-900/50 p-6"
                        ></div>
                      ))}
                    </div>
                  ) : error ? null : (
                    <div className="rounded-3xl h-full w-full flex flex-col gap-2 overflow-scroll scrollbar-hidden">
                      {trailerList.map((trailer) => (
                        <div
                          key={trailer.key}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpand(false);
                            setSelectedTrailer(trailer);
                          }}
                          className={`flex gap-2 items-center p-2 px-4 rounded-[20px] ${selectedTrailer.key === trailer.key ? "bg-gray-900/50" : ""} hover:bg-gray-900/50 transition-all cursor-pointer`}
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// {loading ? (
//                   [
//                     1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 234, 4, 5, 56, 6, 6, 7, 3, 4,
//                     5, 56, 6, 67, 7, 7, 7, 7, 7, 7, 77, 6, 7, 7, 7, 6, 5, 5, 4,
//                     4, 3,
//                   ].map((item) => (
//                     <div className="rounded-3xl bg-gray-100/90 p-4"></div>
//                   ))
//                 ) : error ? null : (
//                   <div className="rounded-3xl h-full ">
//                     {trailerList.map((trailer) => (
//                       <div
//                         key={trailer.key}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setExpand(false);
//                           setSelectedTrailer(trailer);
//                         }}
//                         className={`flex gap-2 items-center p-2 px-4 rounded-[20px] ${selectedTrailer.key === trailer.key ? "bg-gray-900/50" : ""} hover:bg-gray-900/50 transition-all cursor-pointer`}
//                       >
//                         <Image
//                           key={retryCount}
//                           onError={() =>
//                             setRetryCount((prev) =>
//                               prev < 3 ? prev + 1 : prev,
//                             )
//                           }
//                           src={ytThumbnail(trailer.key)}
//                           alt=""
//                           width={64}
//                           height={36}
//                           className="rounded-md"
//                         />
//                         <div className="flex-1 text-white text-sm">
//                           {trailer.name}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
