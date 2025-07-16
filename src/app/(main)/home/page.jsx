"use client";

import { useEffect } from "react";

import TopBar from "@/app/components/TopBar";
import { Tray, Carousel } from "@/app/components/MovieTray";

export default function () {
  return (
    <div className="w-full flex items-center justify-center">
      <TopBar />

      <div className="relative 2xl:w-4/5 w-full flex items-center justify-center z-0">
        <div className="p-3 pt-16 w-full flex flex-col gap-5">
          <div className="">
            <Carousel type={"upcomingMovies"} title={"Upcoming Movies"} />
          </div>
          <div className="w-full">
            <Tray type={"nowPlayingMovies"} title={"Now In Theaters"} />
          </div>
          <div>
            <Carousel type={"topRatedMovies"} title={"Top Rated"} />
          </div>
          <div className="w-full">
            <Tray type={"popularMovies"} title={"Popular Movies"} />
          </div>
        </div>
      </div>
    </div>
  );
}
