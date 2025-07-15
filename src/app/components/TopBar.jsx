"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosSearch as SearchIcon } from "react-icons/io";
import { IoPersonOutline as PersonIcon } from "react-icons/io5";
import { IoNotificationsOutline as NotificationIcon } from "react-icons/io5";
import { BsChevronDown as ArrowDown } from "react-icons/bs";
import {
  HiMiniBars3 as Expand,
  HiMiniBars2 as Collapse,
} from "react-icons/hi2";

import icon from "@/../public/movie-icon.png";

export default function () {
  const [topBarExpand, setTopBarExpand] = useState(true);

  return (
    <div className="fixed z-40 w-full top-0 p-3">
      <div className="relative">
        <label
          htmlFor="toggle"
          onClick={() => setTopBarExpand((prev) => !prev)}
          className={`${topBarExpand ? "rounded-full" : "-translate-x-6 rounded-r-full pl-3"} absolute top-2 left-2 z-50 p-2 peer transition-all bg-[#22232c] hover:bg-[#32333c]`}
        >
          <div className="relative flex items-center justify-center">
            <div className={`${topBarExpand ? "inline" : "hidden"}`}>
              <Collapse />
            </div>
            <div className={`${topBarExpand ? "hidden" : "inline"}`}>
              <Expand />
            </div>
          </div>
        </label>

        <input type="checkbox" id="toggle" className="peer hidden" />

        <div className="backdrop-blur-lg flex peer-checked:-translate-y-32 peer-checked:opacity-0 duration-500 transition-all rounded-full pl-[47px] bg-[#20212a80] px-2 py-[6px] justify-between">
          <div className="flex items-center gap-[7px]">
            <Link
              href={"/"}
              className="flex gap-2 p-1 px-4 transition-all bg-[#22232c] hover:bg-[#32333c] rounded-full items-center"
            >
              <div className="text-lg text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600">
                Cineverse
              </div>
              <div className="rounded-full bg-orange-400 p-1" />
            </Link>
          </div>

          <div className="items-center flex rounded-full bg-[#040510]">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search Movies"
              className="outline-none rounded-l-full text-xs bg-transparent pl-5 h-full"
            />

            <div className="p-[6px] m-1 ml-0 rounded-full bg-[#151525cc] hover:bg-[#1a1a2aff] transition-all">
              <SearchIcon />
            </div>
          </div>

          <div className="gap-[7px] items-center flex rounded-full">
            <div className="p-[10px] rounded-full bg-[#22232c] hover:bg-[#32333c] transition-all">
              <NotificationIcon strokeWidth={1.5} />
            </div>

            <div className="flex items-center gap-1 bg-[#22232c] pl-3 p-[5px] rounded-full hover:bg-[#32333c] transition-all">
              <PersonIcon />

              <div className="text-xs hidden sm:inline text-gray-400">
                Sign In
              </div>

              <div className="hover:bg-[#d1d5d628] transition-all rounded-full p-[6px]">
                <ArrowDown size={13} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
