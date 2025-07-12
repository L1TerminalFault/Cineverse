import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

import { imagePath } from "@/lib/utils";

export default function ({ movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="flex flex-col group rounded-2xl h-max"
    >
      <Image
        src={imagePath(movie.poster_path, "w780")}
        alt=""
        className="rounded-2xl group-hover:hidden"
        width={780}
        height={1170}
      />
      <Image
        src={imagePath(movie.backdrop_path)}
        alt=""
        className="rounded-2xl group-hover:inline hidden"
        width={1280}
        height={720}
      />
      <div className="flex flex-col gap-[6px] p-2 px-1">
        <div className="text-xs text-nowrap overflow-hidden relative">
          {movie.original_title}
          <div className="absolute bg-gradient-to-l from-[#020409] to-[#0000] p-5 right-0 top-0"></div>
        </div>
        <div className="flex gap-1 items-center text-xs/3 text-gray-500">
          <FaStar color="#ffaa11" />
          <div className="">{movie.vote_average.toFixed(1)}</div>
          <div className="text-gray-700">|</div>
          <div>{movie.release_date.split("-")[0]}</div>
        </div>
      </div>
    </Link>
  );
}
