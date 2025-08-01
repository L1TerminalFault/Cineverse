import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { imagePath, genres as movieGenres, tvGenres } from "@/lib/utils";
import noMovie from "@/../public/no-movie.png";
import adultIcon from "@/../public/18.png";

export default function ({ movie, type, extendOnHover = true, textShadow }) {
  const genres = type === "movie" ? movieGenres : tvGenres;
  const [retryImage, setRetryImage] = useState(0);
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(
          `${type === "movie" ? `/movie/${movie.id}` : `/tv/${movie.id}`}`,
        )
      }
      className={`flex flex-col group rounded-3xl h-max w-[145px] duration-500 transition-all  ${extendOnHover ? "hover:w-[386px]" : ""}`}
    >
      <div className="flex relative rounded-3xl overflow-hidden items-center justify-center z-30 h-[217.5px]">
        <Image
          src={
            movie.poster_path ? imagePath(movie.poster_path, "w780") : noMovie
          }
          key={retryImage}
          onError={() => {
            setRetryImage((prev) => (prev < 3 ? prev + 1 : prev));
          }}
          alt=""
          className={`${movie.poster_path ? "" : "opacity-80"} absolute rounded-3xl duration-500 transition-all bg-[#2f364b3b] ${extendOnHover ? "group-hover:w-0 group-hover:opacity-0 h-[217.5] w-[145px]" : "hover:scale-105"}`}
          placeholder="blur"
          blurDataURL={imagePath(movie.poster_path, "w185")}
          quality={100}
          width={780}
          height={1170}
          loading="lazy"
        />
        {extendOnHover ? (
          <>
            <Image
              src={imagePath(movie.backdrop_path)}
              alt=""
              className="absolute left-0 rounded-3xl duration-500 transition-all bg-[#2f364b3b] opacity-0 group-hover:opacity-100 group-hover:w-[386px] w-0"
              placeholder="blur"
              blurDataURL={imagePath(movie.backdrop_path, "w300")}
              quality={100}
              width={1280}
              height={720}
              loading="lazy"
            />

            <div className="absolute opacity-0 transition-all duration-500 p-2 px-4 group-hover:opacity-100 left-[6px] bottom-[6px] rounded-2xl backdrop-blur-md bg-[#0006] max-w-[70%]">
              <div className="text-nowrap overflow-scroll scrollbar-hidden">
                {type === "movie" ? movie.title : movie.name}
              </div>
              <div className="max-h-0 max-w-0 items-center gap-2 overflow-scroll scrollbar-hidden duration-700 transition-all flex group-hover:mt-1 group-hover:mb-2 group-hover:max-h-10 group-hover:max-w-64 md:group-hover:max-w-96">
                {movie.genre_ids.map((genre_id) => (
                  <Link
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    href={`/explore?url=${encodeURIComponent(`/api/discover${type === "movie" ? "Movies" : "TV"}?with_genres=${genre_id}`)}&title=${`Discover%20${type === "movie" ? "Movie" : "TV"}%20-%20${genres[genre_id]}`}`}
                    key={Math.random()}
                    className="p-1 px-3 text-nowrap bg-[#00000030] hover:bg-transparent transition-all backdrop-blur-sm sm:text-xs text-sm rounded-full "
                  >
                    {genres[genre_id] || "N/A"}
                  </Link>
                ))}
              </div>

              <div
                className={`${movie.original_language === "en" ? "hidden" : "flex"} text-nowrap overflow-scroll scrollbar-hidden mb-2 text-xs text-gray-200 px-3`}
              >
                Original Title:{" "}
                {type === "movie" ? movie.original_title : movie.original_name}
              </div>

              <div className="flex items-center justify-between overflow-hidden">
                <div className="flex gap-1 items-center text-xs rounded-full bg-[#0003] mr-3 p-2 px-3 text-gray-400">
                  <FaStar color="#ffaa11" />
                  <div className="">{movie.vote_average.toFixed(1)}</div>
                  <div className="text-gray-500">|</div>
                  <div>
                    {type === "movie"
                      ? movie.release_date?.split("-")[0]
                      : movie.first_air_date?.split("-")[0]}
                  </div>
                </div>
                <div className="flex gap-1">
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
          </>
        ) : null}
      </div>

      <div
        className={`flex flex-col gap-[6px] p-2 px-3 duration-500 ${extendOnHover ? "group-hover:-translate-y-20 group-hover:opacity-0" : ""} transition-all`}
      >
        <div className="text-xs h-4 text-nowrap overflow-hidden relative">
          {type === "movie" ? movie.title : movie.name}
          {textShadow ? <div className="absolute bg-gradient-to-l from-[#020409] to-[#0000] p-5 right-0 top-0"></div> : null}
        </div>
        <div className="flex gap-1 items-center justify-between text-xs/3 text-gray-500">
          <div className="flex gap-1 items-center">
            <FaStar color="#ffaa11" />
            <div className="">{movie.vote_average?.toFixed(1) || "N/A"}</div>
            <div className="text-gray-700">|</div>
            <div>
              {type === "movie"
                ? movie.release_date?.split("-")[0] || "N/A"
                : movie.first_air_date?.split("-")[0] || "N/A"}
            </div>
          </div>

          {movie.adult ? (
            <div>
              <Image src={adultIcon} alt="" className="size-[14px]" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
