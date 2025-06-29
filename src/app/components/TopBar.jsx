import Image from "next/image"
import Link from "next/link"
import { IoIosSearch as SearchIcon } from "react-icons/io"
import { IoPersonOutline as PersonIcon } from "react-icons/io5"
import { TbBookmark as BookmarksIcon } from "react-icons/tb"
import { BsChevronDown as ArrowDown } from "react-icons/bs"

import icon from "@/../public/movie-icon.png"


export default function() {
  return (
    <div className="fixed z-40 w-full top-0 p-3">
      <div className="backdrop-blur-lg flex rounded-full bg-[#2b2c3577] p-1 justify-between">
        <Link href={'/'} className="flex gap-2 p-1 px-3 transition-all hover:bg-[#6a728233] rounded-full items-center">
          <Image
            src={icon}
            alt=""
            className="size-5"
          />
          <div className="text-lg text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">Cineverse</div>
          <div className="rounded-full bg-orange-400 p-1"/>
        </Link>

        <div className="items-center flex rounded-full bg-[#040510]">
          <input type="text" name="" id=""
            placeholder="Search Movies"
            className="outline-none rounded-l-full text-xs bg-transparent pl-5 h-full"
          />

          <div className="p-2 m-1 ml-0 rounded-full bg-[#151525cc] hover:bg-[#151525ff] transition-all">
            <SearchIcon />
          </div>
        </div>

        <div className="gap-1 items-center flex rounded-full">
          <div className="p-3 rounded-full bg-[#2e2e3bb2] hover:bg-[#424253b0] transition-all">
            <BookmarksIcon strokeWidth={1.5} />
          </div>
          
          <div className="flex items-center gap-1 bg-[#2e2e3bb2] pl-3 p-1 rounded-full hover:bg-[#424253b0] transition-all">
            <PersonIcon />

            <div className="text-xs hidden sm:inline text-gray-400">Sign In</div>

            <div className="hover:bg-[#d1d5d628] transition-all rounded-full p-2">
              <ArrowDown />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
