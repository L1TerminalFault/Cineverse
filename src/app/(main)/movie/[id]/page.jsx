"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaPlay } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { PiDotsThreeBold } from "react-icons/pi";

import fireIcon from "@/../public/fire-icon.png";
import TopBar from "@/app/components/TopBar";
import { imagePath } from "@/lib/utils";
import { Tray } from "@/app/components/MovieTray";

export default function () {
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      {!loading ? (
        <div className="w-full relative">
          {/**<div className="w-full relative z-0 overflow-hidden">
            <Image
              src={imagePath(movieDetail?.backdrop_path, "w1280")}
              alt={movieDetail?.title || movieDetail?.name}
              width={1280}
              height={720}
              className="w-full min-w-[1400px] z-0 opacity-90"
            />
            <div className="absolute bottom-0 w-full z-10 p-32 bg-gradient-to-t from-[#020409] to-transparent"></div>
          </div>*/}
          {/**<div className="absolute inset-0 bg-gradient-to-tr from-[#02040921]j via-transparent to-transparent"></div>*/}

          <div
            className="absolute bg-no-repeat bg-cover bg-center flex md:max-h-screen max-h-[1200px] z-0 h-screen flex-col items-center left-0 w-full top-0"
            style={{
              backgroundImage: `linear-gradient(to top right, rgba(2, 4, 9, 255), transparent, transparent), 
url(${imagePath(movieDetail.backdrop_path, "original")})`,
            }}
          >
            <div className="flex flex-col w-full px-6 pt-24 justify-between items-start z-10 flex-1 2xl:w-4/5">
              <div>
                {movieDetail.popularity > 1000 ? (
                  <div className="flex gap-3 items-center p-2 px-4 ml-6 rounded-full bg-black/20 backdrop-blur-md">
                    <>
                      <Image src={fireIcon} className="w-4" alt="" />{" "}
                      <div className="text-nowrap">Now Popular</div>
                    </>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col relative z-20 gap-4 w-2/3 px-6 p-4 rounded-3xl">
                <div className="absolute inset-0 -z-10 blur-3xl rounded-3xl bg-[#000000aa] "></div>
                <div className="flex gap-2 mb-1">
                  {movieDetail.genres.map((genre) => (
                    <div
                      className="p-1 px-5 text-lg bg-white/5 rounded-full text-nowrap backdrop-blur-sm transition-all cursor-default"
                      key={genre.id}
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
                <div className="text-4xl font-semibold max-w-screen-sm">
                  {movieDetail.title}
                </div>
                {!(movieDetail.original_language === "en") ? (
                  <div className="opacity-90 text-lg">
                    {"Original Title: " + movieDetail.original_title}
                  </div>
                ) : null}
                {movieDetail.tagline.length ? (
                  <div className="text-xl opacity-90">
                    {"#" + movieDetail.tagline}
                  </div>
                ) : null}

                <div className="opacity-90 max-h-24 max-w-[75%] overflow-scroll scrollbar-hidden">
                  {movieDetail.overview}
                </div>

                <div className="flex items-center gap-2">
                  <div className=" bg-white backdrop-blur-md p-2 px-4 rounded-full text-lg text-black font-semibold flex items-center gap-2 cursor-pointer hover:bg-white/90 transition-all">
                    <div>
                      <FaPlay className="" />
                    </div>
                    <div>Watch Trailer</div>
                  </div>

                  <div className="bg-black/25 backdrop-blur-md p-2 px-4 rounded-full text-lg text-white font-semibold flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all">
                    <div>
                      <HiDownload className="size-[23px]" />
                    </div>
                    <div>Download</div>
                  </div>

                  <div className="bg-black/25 backdrop-blur-md p-3 rounded-full text-lg text-white font-semibold flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all">
                    <PiDotsThreeBold className="size-[22px]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full bg-gradient-to-t from-[#020409] via-[#020409] to-transparent flex justify-center items-center">
              <div className="2xl:w-4/5 relative w-full px-5 p-8 pt-0">
                <Tray
                  type={"movie"}
                  title={`More From ${movieDetail.genres[0].name}`}
                  url={`/api/discoverMovies?with_genres=${movieDetail.genres[0].id}`}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}{" "}
    </div>
  );
}
