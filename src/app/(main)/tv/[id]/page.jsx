"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaPlay, FaQuestion, FaRegCalendarPlus } from "react-icons/fa6";
import { FaFilm, FaStar } from "react-icons/fa6";
import { MdCancel, MdFlightTakeoff } from "react-icons/md";
import { PiDotsThreeBold } from "react-icons/pi";

import fireIcon from "@/../public/fire-icon.png";
import TopBar from "@/app/components/TopBar";
import { imagePath, monthNames } from "@/lib/utils";
import { Tray } from "@/app/components/MovieTray";
import TrailerBox from "@/app/components/TrailerBox";
import TVSelectBox from "@/app/components/TVSelectBox";
import { FaStopCircle } from "react-icons/fa";
import { BsArrowRepeat, BsChevronRight } from "react-icons/bs";

const statusIcons = {
  "Returning Series": (
    <BsArrowRepeat color="lime" className="sm:size-[17px] size-[13px]" />
  ),
  Ended: (
    <FaStopCircle color="#ff2222" className="sm:size-[17px] size-[13px]" />
  ),
  Canceled: <MdCancel color="#ff2222" className="sm:size-[17px] size-[13px]" />,
  Pilot: (
    <MdFlightTakeoff color="#ff77ff" className="sm:size-[17px] size-[13px]" />
  ),
  "In Production": (
    <FaFilm color="#ff9922" className="sm:size-[17px] size-[13px]" />
  ),
  Planned: (
    <FaRegCalendarPlus color="#33bbff" className="sm:size-[17px] size-[13px]" />
  ),
};

export default function () {
  const router = useRouter();
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerBox, setTrailerBox] = useState(false);
  const [selectBox, setSelectBox] = useState(false);

  const params = useParams();
  const { id } = params;
  const fetchMovieDetail = async () => {
    setLoading(true);
    try {
      const response = await (await fetch(`/api/getTVInfo?id=${id}`)).json();
      if (response.ok) {
        setMovieDetail(response.response);
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching languages:", error);
    } finally {
      setLoading(false);
    }
  };

  const submit = (formData) => {
    const term = formData.get("search");
    router.push(
      `/search?term=${encodeURIComponent(term)}&type=TV`, //${type.includes("TV") ? "tv" : "movies"}`,
    );
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  return (
    <div
      className={`w-full flex items-center justify-center h-full overflow-scroll scrollbar-hidden bg-no-repeat bg-cover bg-center`}
      style={{
        backgroundImage: loading
          ? null
          : `url(${imagePath(movieDetail.backdrop_path, "original")})`,
      }}
    >
      <TopBar setPage={null} submitSearch={submit} />

      <div
        className={`${selectBox ? "overflow-hidden" : ""} flex md:max-h-screen z-0 h-screen flex-col items-center left-0 w-full top-0`}
      >
        {loading ? (
          <div className="flex flex-col w-full px-6 gap-9 pt-24 justify-between items-start z-10 flex-1 2xl:w-4/5">
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
              <div className="w-96 flex flex-col px-1 gap-3 bg-[#ffffff05]4 animate-pulse4 rounded-3xl backdrop-blur-md">
                <div className="rounded-full bg-white/5 animate-pulse p-2 w-4/6"></div>
                <div className="rounded-full bg-white/5 animate-pulse p-2 w-1/2"></div>
                <div className="rounded-full bg-white/5 animate-pulse p-2 w-1/3"></div>
                <div className="rounded-full bg-white/5 animate-pulse p-2 w-4/6"></div>
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
          <div className="flex flex-col gap-16 z-40 w-full sm:px-6 px-5 pt-24 justify-between items-start flex-1 2xl:w-4/5">
            {selectBox ? (
              <TVSelectBox
                selectBox={selectBox}
                setSelectBox={setSelectBox}
                movieDetail={movieDetail}
              />
            ) : null}

            <div>
              {movieDetail.popularity > 500 ? (
                <div className="flex gap-[14px] items-center p-2 px-4 sm:ml-6 ml-[6px] rounded-full bg-black/40 backdrop-blur-xl">
                  <Image src={fireIcon} className="sm:w-4 w-3" alt="" />{" "}
                  <div className="text-nowrap text-xs sm:text-base">
                    Now Popular
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col relative z-20 sm:max-w-[600px] text-sm sm:text-base max-w-full gap-2 sm:gap-[9px] sm:px-6 sm:p-4 rounded-3xl">
              <div className="absolute flex p-4 inset-0 -z-10 blur-2xl rounded-2xl bg-gradient-to-r from-black/85 via-black/85 to-transparent "></div>
              <div className="flex gap-2 mb-1 w-full flex-wrap">
                {movieDetail.genres.map((genre) => (
                  <Link
                    href={`/explore?url=${encodeURIComponent(`/api/discoverMovies?with_genres=${genre.id}`)}&title=${`Discover%20Movie%20-%20${genre.name}`}`}
                    className="p-1 px-4 bg-white/5 hover:bg-[#ffffff17] rounded-full text-base text-nowrap backdrop-blur-xl transition-all cursor-default"
                    key={genre.id}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-start my-2 pl-2 gap-1">
                <div className="sm:text-3xl text-xl gap-2 flex items-center font-semibold">
                  <div>{movieDetail.name}</div>

                  <div className="p-1 text-xs scale-75 text-black bg-white/80 rounded-full backdrop-blur-2xl">
                    {movieDetail.original_language.toUpperCase()}
                  </div>
                </div>
              </div>

              {movieDetail.tagline.length ? (
                <div className="opacity-60 pl-2">
                  {"#" + movieDetail.tagline}
                </div>
              ) : null}

              {!(movieDetail.original_language === "en") ? (
                <div className="opacity-70 hidden sm:inline sm:text-lg pl-2">
                  {"Original Title: " + movieDetail.original_name}
                </div>
              ) : null}

              <div className="flex sm:gap-3 gap-2 overflow-scroll scrollbar-hidden items-center pl-2">
                {movieDetail.vote_average ? (
                  <div className="flex items-center gap-1 sm:gap-2 text-sm text-gray-200">
                    <FaStar color="#fdba74" />
                    <div>{movieDetail.vote_average.toFixed(1)}</div>
                  </div>
                ) : null}

                {movieDetail.number_of_episodes ? (
                  <div className="flex items-center gap-1 sm:gap-2 text-sm p-1 px-3 rounded-full bg-white/5 backdrop-blur-md text-gray-200">
                    <div>Episodes {movieDetail.number_of_episodes}</div>
                  </div>
                ) : null}

                {movieDetail.number_of_seasons ? (
                  <div className="flex items-center gap-1 sm:gap-2 text-sm p-1 px-3 rounded-full bg-white/5 backdrop-blur-md text-gray-200">
                    <div>Seasons {movieDetail.number_of_seasons}</div>
                  </div>
                ) : null}
              </div>

              <div className="opacity-85 ml-2 my-1 sm:text-sm max-h-16 sm:w-[75%] w-[90%] overflow-auto scrollbar-hidden">
                {movieDetail.overview}
              </div>

              <div className="pl-2 flex sm:text-sm text-gray-200 items-center gap-2">
                {statusIcons[movieDetail.status] || (
                  <FaQuestion
                    color="#e5e7eb"
                    className="sm:size-[17px] size-[13px]"
                  />
                )}
                <div>
                  {movieDetail.status +
                    " - " +
                    `${
                      movieDetail.status === "Returning Series"
                        ? "Since " +
                          monthNames[
                            parseInt(movieDetail.first_air_date.split("-")[1]) -
                              1
                          ] +
                          " " +
                          movieDetail.first_air_date.split("-")[0]
                        : null
                    }`}
                </div>
              </div>

              <div className="flex items-center pt-1 gap-2">
                <div
                  onClick={() => setTrailerBox(true)}
                  className="bg-white backdrop-blur-md p-2 px-5 rounded-full text-black flex items-center gap-2 cursor-pointer hover:bg-white/70 transition-all"
                >
                  <div>
                    <FaPlay className="" />
                  </div>
                  <div>Watch Latest</div>
                </div>

                <div
                  onClick={() => setSelectBox(true)}
                  className="bg-black/40 backdrop-blur-md p-2 sm:px-5 rounded-full text-base text-white flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all"
                >
                  <div className="sm:inline hidden">Details</div>
                  <div>
                    <BsChevronRight className="size-[21px]" strokeWidth={0.1} />
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-md p-2 rounded-full text-lg text-white font-semibold flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all">
                  <PiDotsThreeBold className="size-[21px]" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-full bg-[linear-gradient(to_top,_#020409_0%,_#02040999_75%,_#00000000_100%)] flex justify-center items-center">
          <div className="2xl:w-4/5 relative w-full sm:px-5 px-[6px] p-8 pt-6">
            <Tray
              forceLoading={loading}
              type={"TV"}
              textShadow={false}
              title={loading ? "" : `More From ${movieDetail.genres[0].name}`}
              url={
                loading
                  ? null
                  : `/api/discoverTV?with_genres=${movieDetail.genres[0].id}`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
