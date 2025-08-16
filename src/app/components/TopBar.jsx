import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { redirect } from "next/navigation";
import { FiSearch as SearchIcon } from "react-icons/fi";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { BsPerson as PersonIcon } from "react-icons/bs";
import { IoNotificationsOutline as NotificationIcon } from "react-icons/io5";
import { BsChevronDown as ArrowDown } from "react-icons/bs";
import { HiMiniBars3, HiMiniBars2 } from "react-icons/hi2";

import icon from "@/../public/movie-icon.png";
import aiIcon from "@/../public/ai.png";

export default function ({ page, setPage, submitSearch, value }) {
  const [showSearch, setShowSearch] = useState(setPage ? false : true);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const inputRef = useRef(null);
  const [showSideBar, setShowSideBar] = useState(true);

  const submit = (formData) => {
    const term = formData.get("search");
    redirect(
      `/search?term=${encodeURIComponent(term)}&type=${page === "Movies" ? "movies" : "tv"}`, //${type.includes("TV") ? "tv" : "movies"}`,
    );
  };
  const submitSearchFunction = submitSearch || submit;

  return (
    <div className="fixed z-40 w-full top-0 p-3">
      <div className="relative">
        {/******<div
          className={`${showSideBar ? "translate-x-0 2xl:ml-16" : "-translate-x-80"} backdrop-blur-lg absolute bg-[#35374f55] shadow-[#000000dd] shadow-all transition-all top-16 left-0 p-9 h-96 w-32 bg-gray-900 m-2 rounded-3xl`}
        ></div> **/}

        <div
          className={`backdrop-blur-lg flex shadow-all shadow-[#000000dd] duration-500 transition-all rounded-full mpl-[47px] bg-[#35374f55] px-3 2xl:mx-14 my-2 py-2 justify-between`}
        >
          <div className="flex items-center gap-1">
            <div
              onClick={() => setShowSideBar((prev) => !prev)}
              className="rounded-full hover:bg-[#32333c44] p-1 transition-all"
            >
              {showSideBar ? <HiMiniBars2 /> : <HiMiniBars3 />}
            </div>
            <Link
              href={"/home"}
              className="flex gap-2 p-1 px-4 transition-all bg-[#22232c]m hover:bg-[#32333c44] rounded-full items-center"
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
                className={`${showSearch ? "opacity-0 max-w-0" : "opacity-65 max-w-52"} flex duration-500 text-xs/3 p-1 items-center gap-3 transition-all rounded-full`}
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
            <SignedOut>
              <SignInButton
                mode="modal"
                appearance={{
                  theme: dark,
                  elements: {
                    userButtonOuterIdentifier: { color: "#e5e7eb" },
                  },
                }}
              >
                <div className="flex items-center gap-2 px-6 p-2 bg-[#1f202600] rounded-full hover:bg-gray-800 transition-all">
                  <div className="text-xs hidden sm:inline ">Log In</div>
                </div>
              </SignInButton>

              <SignUpButton
                mode="modal"
                appearance={{
                  theme: dark,
                  elements: {
                    userButtonOuterIdentifier: { color: "#e5e7eb" },
                  },
                }}
              >
                <div className="flex items-center gap-2 px-6 p-2 bg-[#040610]k rounded-full hover:bg-gray-800 bg-gray-950 transition-all">
                  <div className="text-xs hidden sm:inline ">Sign Up</div>
                </div>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="">
                <UserButton
                  showName
                  appearance={{
                    theme: dark,
                    elements: {
                      userButtonOuterIdentifier: { color: "#e5e7eb" },
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
