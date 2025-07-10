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
      
      <div className="absolute px-6 p-2 bottom-1 left-1 backdrop-blur-md bg-[#0000003a] overflow-hidden rounded-2xl">
        <div className="">{movie.original_title}</div>
        <div className="flex gap-1 items-center text-xs/3 text-gray-400">
          <FaStar color="#ffaa11"/>
          <div className="">{movie.vote_average.toFixed(1)}</div>
          <div className="text-gray-500">|</div>
          <div>{movie.release_date.split('-')[0]}</div>
        </div>
      </div>
    </Link>
  );
}
