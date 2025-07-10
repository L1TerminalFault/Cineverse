import Image from "next/image"
import Link from "next/link"
import { FaStar } from "react-icons/fa"

import { imagePath } from "@/lib/utils"

export default function({ movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="flex flex-col hover:bg-gray-950 rounded-2xl">
      <Image
        src={imagePath(movie.poster_path, 'w780')}
        alt=""
        className="rounded-2xl"
        width={780}
        height={1170}
      />
      <div className="flex flex-col gap-2">
        <div className="">{movie.original_title}</div>
        <div className="flex gap-1 text-gray-400">
          <FaStar color="#ffaa11" size={10} />
          <div>{movie.vote_average.toFixed(1)}</div>
          <div>{movie.release_date.split('-')[0]}</div>
        </div>
      </div>
    </Link>
  )
}