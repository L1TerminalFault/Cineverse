import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

import { imagePath, genres } from "@/lib/utils";
import carouselLoader from "@/../public/loader1280x720.jpg";

export default function ({ movie, loading }) {
  return (
    <div className=" relative">
      {loading ? (
        <div className="rounded-3xl overflow-hidden relative flex items-center justify-center">
          <Image
            className="opacity-0"
            src={carouselLoader}
            alt=""
            width={1280}
            height={720}
          />

          <div className="absolute flex bg-[#2f364b3b]  w-full h-full">
            <div className="transition-all translate-x-[100%] swipe bg-gradient-to-r from-[#0000] via-[#111827e0] to-[#0000] p-12 absolute h-full"></div>
            <div className="relative p-4 w-full h-full">
              <div className="absolute bottom-2 left-2 rounded-3xl w-[80%]">
                <div className="flex gap-3 flex-col px-5 py-3 w-full h-full bg-[#0a0910cc] rounded-2xl">
                  <div className="rounded-full p-2 w-full bg-[#3f435350]"></div>
                  <div className="flex justify-between gap-12">
                    <div className="rounded-3xl p-3 w-full bg-[#3f435350]"></div>
                    <div className="flex gap-3 w-1/2">
                      <div className="p-3 rounded-full bg-[#3f435350] w-full"></div>
                      <div className="p-3 animate-pulse rounded-full bg-[#3f435350]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Link
          href={`/movie/${movie.id}`}
          className="rounded-3xl group overflow-hidden relative flex"
        >
          <Image
            className="group-hover:scale-110 duration-300"
            src={imagePath(movie.backdrop_path)}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
          />

          <div className="absolute transition-all max-w-[90%] px-3 p-2 bottom-1 left-1 backdrop-blur-md bg-[#0000003a] overflow-hidden rounded-2xl">
            <div className="text-nowrap pb-1 px-2 overflow-scroll scrollbar-hidden">
              {movie.title}
            </div>
            <div className="max-h-0 px-1 max-w-0 items-center gap-2 overflow-scroll scrollbar-hidden duration-700 transition-all flex group-hover:mb-2 group-hover:max-h-10 group-hover:max-w-64 md:group-hover:max-w-96">
              {movie.genre_ids
                .map((genre_id) => genres[genre_id])
                .map((genre) => (
                  <div
                    key={genre}
                    className="p-1 px-3 text-nowrap bg-[#00000041] backdrop-blur-sm sm:text-xs text-sm rounded-full "
                  >
                    {genre}
                  </div>
                ))}
            </div>

            <div
              className={`${
                movie.original_language === "en" ? "hidden" : "flex"
              } text-nowrap overflow-scroll scrollbar-hidden text-xs text-gray-200 h-0 max-w-0 group-hover:h-4 group-hover:max-w-96 group-hover:mb-2 duration-500 transition-all px-2`}
            >
              Original Title: {movie.original_title}
            </div>

            <div className="flex transition-all items-center justify-between overflow-hidden">
              <div className="flex gap-1 items-center text-xs rounded-full bg-[#0003] mr-3 p-2 px-3 text-gray-400">
                <FaStar color="#ffaa11" />
                <div className="">{movie.vote_average.toFixed(1)}</div>
                <div className="text-gray-500">|</div>
                <div>{movie.release_date.split("-")[0]}</div>
              </div>

              <div className="flex gap-1 max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-32 transition-all delay-300 duration-700">
                <div className="p-0 px-3 flex items-center rounded-full text-xs bg-[#0004]">
                  <div className="text-nowrap">
                    {movie.adult ? "18+" : "All Ages"}
                  </div>
                </div>
                <div className="p-2 rounded-full text-xs bg-[#0004]">
                  {movie.original_language.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
