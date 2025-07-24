"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { IoPersonSharp as PersonIcon } from "react-icons/io5";
import { IoNotificationsOutline as NotificationIcon } from "react-icons/io5";
import { BsChevronDown as ArrowDown } from "react-icons/bs";
import {
  HiMiniBars3 as Expand,
  HiMiniBars2 as Collapse,
} from "react-icons/hi2";

import icon from "@/../public/movie-icon.png";
import aiIcon from "@/../public/ai.png";

export default function ({ page, setPage, submitSearch, value }) {
  const router = useRouter();
  const [topBarExpand, setTopBarExpand] = useState(true);
  const [showSearch, setShowSearch] = useState(setPage ? false : true);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const inputRef = useRef(null);

  const submit = (formData) => {
    const term = formData.get("search");
    router.push(
      `/search?term=${encodeURIComponent(term)}&type=movies`, //${type.includes("TV") ? "tv" : "movies"}`,
    );
  };

  const submitSearchFunction = submitSearch || submit;

  return (
    <div className="fixed z-40 w-full top-0 p-3">
      <div className="relative">
        <label
          htmlFor="toggle"
          onClick={() => setTopBarExpand((prev) => !prev)}
          className={`${topBarExpand ? "rounded-full" : "bg-[#22232c55] backdrop-blur-xl -translate-x-6 rounded-r-full pl-3"} absolute top-2 left-2 z-50 p-2 transition-all mbg-[#22232c] hover:bg-[#32333c77]`}
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

        <div
          className={`backdrop-blur-lg flex ${!topBarExpand ? "-translate-y-32 opacity-0" : ""} shadow-all shadow-[#000000dd] duration-500 transition-all rounded-[20px] mpl-[47px] bg-[#35374f55] px-2 py-[6px] justify-between`}
        >
          <div className="flex items-center gap-[7px]">
            <Link
              href={"/home"}
              className="flex gap-2 p-1 pl-9 px-4 transition-all bg-[#22232c]m hover:bg-[#32333c77] rounded-full items-center"
            >
              {/**<Image src={icon} alt="" width={20} height={20} />*/}{" "}
              <div className="text-lg text-transparent bg-clip-text bg-gradient-to-br bg-gray-100 font-bold">
                CINEVERSE
              </div>
              <div className="rounded-full -translate-x-1 bg-orange-400 p-1" />
            </Link>
          </div>

          <div className="items-center gap-2 flex-row-reverse flex rounded-full bg-[#040610]">
            <div
              onClick={() => {
                setShowSearch((prev) => (setPage ? !prev : true));
                inputRef.current.focus();
              }}
              className="p-[7px] m-[3px] ml-0 rounded-full bg-[#1f1f2f] hover:bg-[#242334] transition-all"
            >
              <SearchIcon />
            </div>

            <div
              className={`${showSearch ? "opacity-100 max-w-52" : "max-w-0 opacity-0"} flex w-full h-full overflow-hidden transition-all duration-500`}
            >
              <form action={submitSearchFunction}>
                <input
                  ref={inputRef}
                  type="text"
                  name="search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  placeholder="Search Movies"
                  className={` outline-none w-full h-full z-30 transition-all duration-100 rounded-l-full text-xs bg-transparent pl-5`}
                />
              </form>
            </div>
            {setPage ? (
              <div
                className={`${showSearch ? "opacity-0 max-w-0" : "opacity-65 max-w-52"} flex duration-500 text-xs/3 p-1 items-center gap-1 transition-all rounded-full`}
              >
                {" "}
                <div
                  onClick={() => setPage("Movies")}
                  className={`${page === "Movies" ? "bg-gray-800 font-semibold" : ""} rounded-full p-2 px-5 hover:bg-gray-800 transition-all`}
                >
                  Movies
                </div>
                <div
                  onClick={() => setPage("Series")}
                  className={`${page === "Series" ? "bg-gray-800 font-semibold" : ""} rounded-full px-5 p-2 hover:bg-gray-800 transition-all`}
                >
                  Series
                </div>
              </div>
            ) : null}
          </div>

          <div className="gap-[6px] items-center flex rounded-full">
            <div className="p-[6px] rounded-full bg-[#22232c] hover:bg-[#32333c] transition-all">
              <Image src={aiIcon} className="size-[22px]" alt="" />
            </div>

            <div className="flex items-center gap-2 bg-[#22232c] pl-3 p-[5px] rounded-full hover:bg-[#32333c] transition-all">
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
