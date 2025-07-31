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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

import fireIcon from "@/../public/fire-icon.png";
import TopBar from "@/app/components/TopBar";
import { imagePath, formatRuntime, monthNames, formatMoney } from "@/lib/utils";
import { Tray } from "@/app/components/MovieTray";
import TrailerBox from "@/app/components/TrailerBox";
import DownloadBox from "@/app/components/DownloadBox";

export default function () {
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerBox, setTrailerBox] = useState(false);
  const [downloadBox, setDownloadBox] = useState(false);
  const [downloadPending, setDownloadPending] = useState(false);
  const router = useRouter();

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

  const downloadMovie = async () => {
    setDownloadPending(true);
    try {
      const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?query_term=${movieDetail.imdb_id}`,
      );
      const data = await response.json();
      if (data.status === "ok" && data.data.movie_count) {
        const downloadUrl = data.data.movies[0].torrents[0].url;
        router.push(downloadUrl);
      } else {
        setDownloadBox(true);
      }
    } catch (error) {
      console.error("Error downloading movie:", error);
    } finally {
      setDownloadPending(false);
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

                <div className=" rounded-full bg-white/5 w-40 animate-pulse backdrop-blur-md"></div>
                <div className="w-96 flex flex-col gap-2 p-6 bg-[#ffffff05] animate-pulse rounded-3xl backdrop-blur-md">
                  <div className="rounded-full bg-white/5 animate-pulse p-[6px] w-4/6"></div>
                  <div className="rounded-full bg-white/5 animate-pulse p-[6px] w-1/2"></div>
                  <div className="rounded-full bg-white/5 animate-pulse p-[6px] w-1/3"></div>
                  <div className="rounded-full bg-white/5 animate-pulse p-[6px] w-4/6"></div>
                </div>
                <div></div>

                <div className="flex items-center gap-2">
                  <div className="h-11 w-40 rounded-full bg-white/5 animate-pulse backdrop-blur-md"></div>
                  <div className="h-11 w-40 rounded-full bg-white/5 animate-pulse backdrop-blur-md"></div>
                  <div className="h-11 w-11 rounded-full bg-white/5 animate-pulse backdrop-blur-md"></div>
                </div>
              </div>
            </div>
          ) : error ? null : (
            <div className="flex flex-col gap-5 z-40 w-full px-6 pt-24 justify-between items-start flex-1 2xl:w-4/5">
              {trailerBox ? (
                <TrailerBox
                  movieId={id}
                  trailerBox={trailerBox}
                  setTrailerBox={setTrailerBox}
                />
              ) : null}
              {downloadBox ? (
                <DownloadBox
                  downloadBox={downloadBox}
                  setDownloadBox={setDownloadBox}
                  movieDetail={movieDetail}
                />
              ) : null}

              <div>
                {movieDetail.popularity > 500 ? (
                  <div className="flex gap-[14px] items-center p-2 px-4 ml-6 rounded-full bg-black/40 backdrop-blur-xl">
                    <Image src={fireIcon} className="w-4" alt="" />{" "}
                    <div className="text-nowrap">Now Popular</div>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col relative z-20 gap-[9px] w-2/3 px-6 p-4 rounded-3xl">
                <div className="absolute flex p-4 inset-0 -z-10 blur-2xl rounded-2xl bg-gradient-to-r from-black/85 via-black/85 to-transparent "></div>
                <div className="flex gap-2 mb-1 flex-wrap max-w-[600px]">
                  {movieDetail.genres.map((genre) => (
                    <Link
                      href={`/explore?url=${encodeURIComponent(`/api/discoverMovies?with_genres=${genre.id}`)}&title=${`Discover%20Movie%20-%20${genre.name}`}`}
                      className="p-1 px-4 bg-white/5 hover:bg-[#ffffff17] rounded-full text-nowrap backdrop-blur-xl transition-all cursor-default"
                      key={genre.id}
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl gap-2 flex items-center font-semibold max-w-[500px]">
                    <div>{movieDetail.title}</div>

                    <div className="p-1 text-xs text-black bg-white/80 rounded-full backdrop-blur-2xl">
                      {movieDetail.original_language.toUpperCase()}
                    </div>
                  </div>
                </div>

                {movieDetail.tagline.length ? (
                  <div className="opacity-60">{"#" + movieDetail.tagline}</div>
                ) : null}

                {!(movieDetail.original_language === "en") ? (
                  <div className="opacity-70 text-lg">
                    {"Original Title: " + movieDetail.original_title}
                  </div>
                ) : null}

                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2 text-sm text-gray-200">
                    <div className="flex p-1 px-3 bg-orange-300 rounded-full items-center">
                      <FaStar color="black" />
                    </div>
                    <div>
                      {movieDetail.vote_average.toFixed(1) || "Not Rated"}
                    </div>
                  </div>

                  {movieDetail.revenue ? (
                    <div className="flex items-center gap-2 text-sm text-gray-200">
                      <div className="flex p-1 px-3 bg-[#70ff90] rounded-full items-center">
                        <FaSackDollar color="black" />
                      </div>
                      <div>{`${formatMoney(movieDetail.revenue)}`}</div>
                    </div>
                  ) : null}

                  {movieDetail.budget ? (
                    <div className="flex items-center gap-2 text-sm text-gray-200">
                      <div className="flex p-[2px] px-[10px] bg-[#ee2255] rounded-full items-center">
                        <BiSolidDollarCircle color="black" size={18} />
                      </div>
                      <div>{`${formatMoney(movieDetail.budget)}`}</div>
                    </div>
                  ) : null}

                  {movieDetail.runtime ? (
                    <div className="flex items-center gap-2 text-sm text-gray-200">
                      <div className="flex p-1 px-3 bg-[#cc22ff] rounded-full items-center">
                        <FaHourglassHalf color="black" />
                      </div>
                      <div>{formatRuntime(movieDetail.runtime)}</div>
                    </div>
                  ) : null}
                </div>

                <div className="opacity-85 text-sm max-h-16 max-w-[500px] w-[75%] overflow-auto scrollbar-hidden">
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
                              parseInt(movieDetail.release_date.split("-")[1]) -
                                1
                            ] +
                            " " +
                            movieDetail.release_date.split("-")[0]
                          : null
                      }`}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    onClick={() => setTrailerBox(true)}
                    className="bg-white backdrop-blur-md p-2 px-5 rounded-full text-black flex items-center gap-2 cursor-pointer hover:bg-white/70 transition-all"
                  >
                    <div>
                      <FaPlay className="" />
                    </div>
                    <div>Watch Trailer</div>
                  </div>

                  <div
                    onClick={downloadMovie}
                    className="bg-black/40 backdrop-blur-md p-2 px-5 rounded-full text-white flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all"
                  >
                    <div>
                      {downloadPending ? (
                        <div className="animate-spin">
                          <AiOutlineLoading3Quarters size={21} />
                        </div>
                      ) : (
                        <LiaDownloadSolid
                          className="size-[21px]"
                          strokeWidth={0.1}
                        />
                      )}
                    </div>
                    <div>Download</div>
                  </div>

                  <div
                    onClick={() => setDownloadBox(true)}
                    className="bg-black/40 backdrop-blur-md p-2 rounded-full text-lg text-white font-semibold flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all"
                  >
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
