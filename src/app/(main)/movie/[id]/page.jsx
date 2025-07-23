"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
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

          <div
            className="absolute bg-no-repeat bg-cover bg-center flex md:max-h-screen max-h-[1200px] z-0 h-screen flex-col gap-4  items-center left-0 w-full top-0 "
            style={{
              backgroundImage: `linear-gradient(to top right, rgba(2, 4, 9, 0.73), rgba(2, 4, 9, 0.67), transparent), url(${imagePath(movieDetail.backdrop_path)})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr z-0 from-[#02040921]j via-transparent to-transparent"></div>
            <div className="flex flex-col w-full px-12 pt-24 justify-between items-start z-10 flex-1 2xl:w-4/5">
              <div className="flex gap-3 items-center p-2 px-4 rounded-full bg-[#14162444] backdrop-blur-md">
                {movieDetail.popularity > 5000 ? (
                  <>
                    <Image src={fireIcon} className="w-4" alt="" />{" "}
                    <div className="text-nowrap">Now Popular</div>
                  </>
                ) : null}
              </div>
              <div className="flex flex-col gap-4 w-2/3">
                <div className="flex gap-2 mb-1">
                  {movieDetail.genres.map((genre) => (
                    <div
                      className="p-1 px-5 text-lg text-[#fffe] bg-[#14162422] rounded-full text-nowrap backdrop-blur-md transition-all cursor-default"
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
                  <div className="opacity-60 text-lg">
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
              </div>
            </div>

            <div className="w-full bg-gradient-to-t from-[#020409] via-[#020409aa] to-transparent flex justify-center items-center">
              <div className="2xl:w-4/5 relative w-full px-5 p-8 ">
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

