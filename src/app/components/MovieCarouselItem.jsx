import Image from "next/image";
import Link from "next/link"
import { FaStar } from "react-icons/fa"

import { imagePath } from "@/lib/utils";

export default function ({ movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="rounded-3xl overflow-hidden relative flex">
      <Image
        className=""
        src={imagePath(movie.backdrop_path)}
        alt=""
        width={1280}
        height={720}
      />
      
      <div className="absolute px-5 p-2 bottom-0 left-0 backdrop-blur-md bg-[#0000] rounded-tr-2xl">
        <div className="">{movie.original_title}</div>
        <div className="flex gap-1 items-center text-xs text-gray-300">
          <FaStar color="#ffaa11"/>
          <div className="">{movie.vote_average.toFixed(1)}</div>
          <div className="text-gray-400">|</div>
          <div>{movie.release_date.split('-')[0]}</div>
        </div>
      </div>
    </Link>
  );
}
