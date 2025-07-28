"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FaPlay,
  FaCommentDots,
  FaCheck,
  FaBan,
  FaQuestion,
} from "react-icons/fa6";
import { LuCalendarPlus } from "react-icons/lu";
import { FaFilm, FaHourglassHalf, FaStar } from "react-icons/fa6";
import { MdMovieEdit } from "react-icons/md";
import { LiaDownloadSolid } from "react-icons/lia";
import { PiDotsThreeBold } from "react-icons/pi";
import { FaSackDollar } from "react-icons/fa6";
import { BiSolidDollarCircle } from "react-icons/bi";

import fireIcon from "@/../public/fire-icon.png";
import TopBar from "@/app/components/TopBar";
import { imagePath, formatRuntime, monthNames, formatMoney } from "@/lib/utils";
import { Tray } from "@/app/components/MovieTray";
import TrailerBox from "@/app/components/TrailerBox";

export default function () {
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerBox, setTrailerBox] = useState(false)

  const params = useParams();
  const { id } = params;
  const fetchMovieDetail = async () => {
    setLoading(true);
    try {
      const response = await (await fetch(`/api/getMovieInfo?id=${id}`)).json();
      if (response.ok) {
        setMovieDetail(response.response);
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  return (
    <div className="w-full flex items-center justify-center h-full">
      <TopBar setPage={null} />
      {
        <div
          className="absolute bg-no-repeat bg-cover bg-center flex md:max-h-screen max-h-[1200px] z-0 h-screen flex-col items-center left-0 w-full top-0"
          style={{
            backgroundImage: loading
              ? null
              : `url(${imagePath(movieDetail.backdrop_path, "original")})`,
          }}
        >
          {loading ? (
            <div className="flex flex-col w-full px-6 pt-24 justify-between items-start z-10 flex-1 2xl:w-4/5">
              <div></div>

              <div className="flex flex-col z-20 gap-4 w-2/3 px-6 p-4 rounded-3xl">
                <div className="flex gap-2 mb-1">
                  {[0, 1, 2].map((items) => (
                    <div
                      key={items}
                      className="h-9 rounded-full bg-white/5 w-24 animate-pulse backdrop-blur-md"
                    ></div>
                  ))}
                </div>

                <div className="h-10 rounded-full bg-white/5 w-40 animate-pulse backdrop-blur-md"></div>
                <div className="w-96 h-32 bg-white/5 animate-pulse rounded-3xl backdrop-blur-md"></div>
                <div></div>

                <div className="flex items-center gap-2">
                  <div className="h-11 w-40 rounded-full bg-white/5 animate-pulse backdrop-blur-md"></div>
                  <div className="h-11 w-40 rounded-full bg-white/5 animate-pulse backdrop-blur-md"></div>
                  <div className="h-11 w-11 rounded-full bg-white/5 animate-pulse backdrop-blur-md"></div>
                </div>
              </div>
            </div>
          ) : error ? null : (
            <div className="flex flex-col z-40 w-full px-6 pt-24 justify-between items-start flex-1 2xl:w-4/5">
                {trailerBox ? <TrailerBox movieId={id} trailerBox={trailerBox} setTrailerBox={setTrailerBox}  /> : null}

              <div>
                {movieDetail.popularity > 1000 ? (
                  <div className="flex gap-3 items-center p-2 px-4 ml-6 rounded-full bg-black/20 backdrop-blur-md">
                    <Image src={fireIcon} className="w-4" alt="" />{" "}
                    <div className="text-nowrap">Now Popular</div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col relative z-20 gap-4 w-2/3 px-6 p-4 rounded-3xl">
                <div className="absolute flex p-4 inset-0 -z-10 blur-2xl rounded-2xl bg-gradient-to-r from-black/85 via-black/85 to-transparent ">
                </div>
                <div className="flex gap-2 mb-1">
                  {movieDetail.genres.map((genre) => (
                    <Link
                      href={`/explore?url=${encodeURIComponent(`/api/discoverMovies?with_genres=${genre.id}`)}&title=${`Discover%20Movie%20-%20${genre.name}`}`}
                      className="p-1 px-5 text-lg bg-white/5 hover:bg-[#ffffff17] rounded-full text-nowrap backdrop-blur transition-all cursor-default"
                      key={genre.id}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
                  <div className="flex flex-row items-center gap-4">
                 <div className="text-4xl font-semibold max-w-screen-sm">
                  {movieDetail.title}
                </div>
   
                    <div className="p-2 text-xs bg-white/5 rounded-full backdrop-blur">
                      {movieDetail.original_language.toUpperCase()}
                    </div>
                  </div>
                                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-200">
                    <div className="flex p-1 px-3 bg-orange-300 rounded-full items-center">
                      <FaStar color="black" />
                    </div>
                    <div>{movieDetail.vote_average.toFixed(1)}</div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-200">
                    <div className="flex p-1 px-3 bg-[#cc22ff] rounded-full items-center">
                      <FaSackDollar color="black" />
                    </div>
                    <div>{`Revenue ${movieDetail.revenue ? formatMoney(movieDetail.revenue) : "N/A"}`}</div>
                  </div>

<div className="flex items-center gap-2 text-sm text-gray-200">
                    <div className="flex p-[2px] px-[10px] bg-[#ee2255] rounded-full items-center">
                      <BiSolidDollarCircle color="black" size={18} />
                    </div>
                    <div>{`Budget ${movieDetail.budget ? formatMoney(movieDetail.budget) : "N/A"}`}</div>
                  </div>


                  <div className="flex items-center gap-2 text-sm text-gray-200">
                    <div className="flex p-1 px-3 bg-[#7fcfa0] rounded-full items-center">
                      <FaHourglassHalf color="black" />
                    </div>
                    <div>{formatRuntime(movieDetail.runtime)}</div>
                  </div>
                </div>
                {!(movieDetail.original_language === "en") ? (
                  <div className="opacity-90 text-lg">
                    {"Original Title: " + movieDetail.original_title}
                  </div>
                ) : null}
                {movieDetail.tagline.length ? (
                  <div className="opacity-60">{"#" + movieDetail.tagline}</div>
                ) : null}

                <div className="opacity-90 max-h-24 max-w-[500px] w-[75%] overflow-scroll scrollbar-hidden">
                  {movieDetail.overview}
                </div>
                <div className="px-1 flex text-sm text-gray-200 items-center gap-2">
                  {movieDetail.status === "Released" ? (
                    <FaCheck color="lime" size={17} />
                  ) : movieDetail.status === "Canceled" ? (
                    <FaBan color="#ff2222" size={17} />
                  ) : movieDetail.status === "Planned" ? (
                    <LuCalendarPlus color="#33bbff" size={17} />
                  ) : movieDetail.status === "In Production" ? (
                    <FaFilm color="#ff9922" size={17} />
                  ) : movieDetail.status === "Post Production" ? (
                    <MdMovieEdit color="#aa66ff" size={17} />
                  ) : movieDetail.status === "Rumored" ? (
                    <FaCommentDots color="#ff77ff" size={17} />
                  ) : (
                    <FaQuestion color="#e5e7eb" size={17} />
                  )}
                  <div>
                    {movieDetail.status +
                      " - " +
                      `${
                        movieDetail.status === "Released"
                          ? monthNames[
                              parseInt(movieDetail.release_date.split("-")[1]) - 1
                            ] +
                            " " +
                            movieDetail.release_date.split("-")[0]
                          : null
                      }`}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div onClick={() => setTrailerBox(true)} className="bg-white backdrop-blur-md p-3 px-5 rounded-full text-black flex items-center gap-2 cursor-pointer hover:bg-white/70 transition-all">
                    <div>
                      <FaPlay className="" />
                    </div>
                    <div>Watch Trailer</div>
                  </div>

                  <div className="bg-black/40 backdrop-blur-md p-3 px-5 rounded-full text-white flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all">
                    <div>
                      <LiaDownloadSolid
                        className="size-[21px]"
                        strokeWidth={0.1}
                      />
                    </div>
                    <div>Download</div>
                  </div>

                  <div className="bg-black/40 backdrop-blur-md p-3 rounded-full text-lg text-white font-semibold flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all">
                    <PiDotsThreeBold className="size-[21px]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="w-full bg-gradient-to-t from-[#020409] via-[#020409] to-transparent flex justify-center items-center">
            <div className="2xl:w-4/5 relative w-full px-5 p-8 pt-0">
              <Tray
                forceLoading={loading}
                type={"movie"}
                title={loading ? "" : `More From ${movieDetail.genres[0].name}`}
                url={
                  loading
                    ? null
                    : `/api/discoverMovies?with_genres=${movieDetail.genres[0].id}`
                }
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
}
