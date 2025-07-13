"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { IoIosSearch as SearchIcon } from "react-icons/io"
import { IoPersonOutline as PersonIcon } from "react-icons/io5"
import { IoNotificationsOutline as NotificationIcon } from "react-icons/io5"
import { BsChevronDown as ArrowDown } from "react-icons/bs"
import { HiMiniBars3 as Expand, HiMiniBars2 as Collapse } from "react-icons/hi2"

import icon from "@/../public/movie-icon.png"


export default function() {
  const [expandTopBar, setExpandTopBar] = useState(true)

  return (
    <div className="fixed z-40 w-full top-0 p-3">
      {expandTopBar ? (
        <div className="backdrop-blur-lg flex rounded-full bg-[#29292959] p-[6px] justify-between">
         
         <div className="flex items-center gap-1">
<div onClick={() => setExpandTopBar(false)} className="ml-1 p-2 rounded-full transition-all bg-[#2e2e2e8c] hover:bg-[#3b3b3bd0]">
            <Collapse />
          </div>
        <Link href={'/'} className="flex gap-2 p-1 px-4 transition-all bg-[#302d2d5d] hover:bg-[#6a728233] rounded-full items-center">
          
          <div className="text-lg text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">Cineverse</div>
          <div className="rounded-full bg-orange-400 p-1"/>
        </Link>
         </div>
          

        <div className="items-center flex rounded-full bg-[#040510]">
          <input type="text" name="" id=""
            placeholder="Search Movies"
            className="outline-none rounded-l-full text-xs bg-transparent pl-5 h-full"
          />

          <div className="p-2 m-1 ml-0 rounded-full bg-[#151525cc] hover:bg-[#151525ff] transition-all">
            <SearchIcon />
          </div>
        </div>

        <div className="gap-[7px] items-center flex rounded-full">
          <div className="p-[10px] rounded-full bg-[#2e2e3b81] hover:bg-[#424253b0] transition-all">
            <NotificationIcon strokeWidth={1.5} />
          </div>
          
          <div className="flex items-center gap-1 bg-[#2e2e3b8e] mr-1 pl-3 p-[5px] rounded-full hover:bg-[#424253b0] transition-all">
            <PersonIcon />

            <div className="text-xs hidden sm:inline text-gray-400">Sign In</div>

            <div className="hover:bg-[#d1d5d628] transition-all rounded-full p-[6px]">
              <ArrowDown size={13} />
            </div>
          </div>
        </div>

      </div>
      ) : (
        <div onClick={() => setExpandTopBar(true)} className="p-2 w-10 -translate-x-3 rounded-r-full bg-[#353535a4] backdrop-blur-md">
          <Expand />
        </div>
      )}
    </div>
  )
}
