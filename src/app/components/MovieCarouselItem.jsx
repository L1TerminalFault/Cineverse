import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { BsFilter } from "react-icons/bs";

import { imagePath, genres as movieGenres, tvGenres } from "@/lib/utils";

export default function ({ movie, type }) {
  const genres = type === "movie" ? movieGenres : tvGenres;
  const router = useRouter();

  return (
    <div className=" relative">
      <div
        onClick={() =>
          router.push(
            `${type === "movie" ? `/movie/${movie.id}}` : `/tv/${movie.id}`}`,
          )
        }
        className="rounded-3xl group overflow-hidden relative flex"
      >
        <Image
          className="group-hover:scale-110 duration-300"
          src={imagePath(movie.backdrop_path)}
          alt=""
          blurDataURL={imagePath(movie.backdrop_path, "w300")}
          quality={100}
          placeholder="blur"
          width={1280}
          height={720}
          loading="lazy"
        />

        <div className="absolute transition-all max-w-[90%] px-3 p-2 bottom-1 left-1 backdrop-blur-md bg-[#0000003a] overflow-hidden rounded-2xl">
          <div className="text-nowrap pb-1 px-2 overflow-scroll scrollbar-hidden">
            {movie.title || movie.name}
          </div>
          <div className="max-h-0 px-1 max-w-0 items-center gap-2 overflow-scroll scrollbar-hidden duration-700 transition-all flex group-hover:mb-2 group-hover:max-h-10 group-hover:max-w-64 md:group-hover:max-w-96">
            {movie.genre_ids.map((genre_id) => (
              <Link
                onClick={(e) => {
                  e.stopPropagation();
                }}
                href={`/explore?url=${encodeURIComponent(`/api/discover${type === "movie" ? "Movies" : "TV"}?with_genres=${genre_id}`)}&title=${`Discover%20${type === "movie" ? "Movie" : "TV"}%20-%20${genres[genre_id]}`}`}
                key={Math.random()}
                className="p-1 px-3 text-nowrap bg-[#00000041] hover:bg-transparent transition-all backdrop-blur-sm sm:text-xs text-sm rounded-full "
              >
                {genres[genre_id] || "N/A"}
              </Link>
            ))}
          </div>

          <div
            className={`${
              movie.original_language === "en" ? "hidden" : "flex"
            } text-nowrap overflow-scroll scrollbar-hidden text-xs text-gray-200 h-0 max-w-0 group-hover:h-4 group-hover:max-w-96 group-hover:mb-2 duration-500 transition-all px-2`}
          >
            Original Title:{" "}
            {type === "movie" ? movie.original_title : movie.original_name}
          </div>

          <div className="flex transition-all items-center justify-between overflow-hidden">
            <div className="flex gap-1 items-center text-xs rounded-full bg-[#0003] mr-3 p-2 px-3 text-gray-400">
              <FaStar color="#ffaa11" />
              <div className="">{movie.vote_average.toFixed(1)}</div>
              <div className="text-gray-500">|</div>
              <div>
                {movie.release_date?.split("-")[0] ||
                  movie.first_air_date?.split("-")[0]}
              </div>
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
      </div>
    </div>
  );
}
