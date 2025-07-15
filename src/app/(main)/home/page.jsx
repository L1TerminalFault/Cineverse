"use client";

import { useEffect } from "react";

import TopBar from "@/app/components/TopBar";
import { Tray, Carousel } from "@/app/components/MovieTray";

export default function () {
  return (
    <div className="">
      <TopBar />

      <div className="relative flex">
        <div className="p-3 pt-16">
          <div>
            <Carousel type={"upcomingMovies"} title={"Upcoming Movies"} />
          </div>
          <div>
            <Tray type={"nowPlayingMovies"} title={"Now In Theaters"} />
          </div>
          <div>
            <Carousel type={"topRatedMovies"} title={"Top Rated"} />
          </div>
          <div>
            <Tray type={"popularMovies"} title={"Popular Movies"} />
          </div>
        </div>
      </div>
    </div>
  );
}
