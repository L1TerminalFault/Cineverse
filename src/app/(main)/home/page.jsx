"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TopBar from "@/app/components/TopBar";
import { Tray, Carousel } from "@/app/components/MovieTray";
import DiscoverTray from "@/app/components/DiscoverTray";
import HomeEntryMovieComponent from "@/app/components/HomeEntryMovieComponent";

export default function () {
  const [currentPage, setCurrentPage] = useState("Movies");
  const router = useRouter();

  const submitSearch = (formData) => {
    const term = formData.get("search");
    router.push(
      `/search?term=${encodeURIComponent(term)}&type=${currentPage.toLowerCase()}`,
    );
  };

  return (
    <div className="w-full flex items-center justify-center">
      <TopBar
        page={currentPage}
        setPage={setCurrentPage}
        submitSearch={submitSearch}
      />

      <div className="relative 2xl:w-4/5 w-full flex items-center justify-center z-0">
        <div className="p-3 pt-24 w-full flex flex-col gap-5">
          <div className="w-full">
            <HomeEntryMovieComponent />
          </div>

          <div className="">
            {currentPage === "Movies" ? (
              <Carousel type={"upcomingMovies"} title={"Upcoming Movies"} />
            ) : currentPage === "Series" ? (
              <Carousel type={"onAirTVShows"} title={"Streaming Now"} />
            ) : null}
          </div>
          <div className="w-full">
            {currentPage === "Movies" ? (
              <Tray type={"nowPlayingMovies"} title={"Now In Theaters"} />
            ) : currentPage === "Series" ? (
              <Tray type={"popularTVShows"} title={"Popular TV Shows"} />
            ) : null}
          </div>
          <div>
            {currentPage === "Movies" ? (
              <DiscoverTray type={"movie"} />
            ) : (
              <DiscoverTray type={"tv"} />
            )}
          </div>
          <div>
            {currentPage === "Movies" ? (
              <Carousel type={"topRatedMovies"} title={"Top Rated"} />
            ) : currentPage === "Series" ? (
              <Carousel type={"topRatedTVShows"} title={"Top Rated TV Shows"} />
            ) : null}
          </div>
          <div className="w-full">
            {currentPage === "Movies" ? (
              <Tray type={"popularMovies"} title={"Popular Movies"} />
            ) : currentPage === "Series" ? (
              <Tray type={"onAirTodayTVShows"} title={"Streaming Today"} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
