import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

import { imagePath, genres } from "@/lib/utils";

export default function ({ movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="rounded-3xl group overflow-hidden relative flex"
    >
      <Image
        className=""
        src={imagePath(movie.backdrop_path)}
        alt=""
        width={1280}
        height={720}
      />

      <div className="absolute transition-all max-w-[90%] px-6 p-2 bottom-1 left-1 backdrop-blur-md bg-[#0000003a] overflow-hidden rounded-2xl">
        <div className="text-nowrap overflow-scroll scrollbar-hidden">
          {movie.title}
        </div>
        <div className="max-h-0 max-w-0 items-center gap-2 overflow-scroll scrollbar-hidden duration-700 transition-all flex group-hover:mt-1 group-hover:mb-3 group-hover:max-h-10 group-hover:max-w-64 md:group-hover:max-w-96">
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
        <div className="flex gap-1 items-center text-xs/3 text-gray-400">
          <FaStar color="#ffaa11" />
          <div className="">{movie.vote_average.toFixed(1)}</div>
          <div className="text-gray-500">|</div>
          <div>{movie.release_date.split("-")[0]}</div>
        </div>
      </div>
    </Link>
  );
}
