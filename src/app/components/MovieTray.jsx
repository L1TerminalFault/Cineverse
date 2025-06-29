"use client";

import { useEffect, useState, useCallback } from "react";
import { BsChevronRight } from "react-icons/bs";

import MovieCarouselItem from "./MovieCarouselItem";

export const TrayUpcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carouselHeight, setCarouselHeight] = useState(0);

  const carousel = useCallback((node) => {
    if (node) {
      const carouselFullWidth = node.getBoundingClientRect().width;
      const carouselCalcHeight = Math.floor(
        (carouselFullWidth - 20) / 2 / (16 / 9)
      );
      setCarouselHeight(carouselCalcHeight);
    }
  });

  const fetchUpcomingMovies = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 5000))
      const response = await (await fetch("/api/getUpcomingMovies")).json();
      if (response.ok) setUpcomingMovies(response.response.results);
      else throw Error(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  return (
    <div className="p-1">
      <div className="p-3 px-6 justify-between flex">
        <div className="text-xl">Upcoming Movies</div>
        <div>
          <div className="hover:bg-gray-900 p-2 transition-all rounded-full ">
            <BsChevronRight size={23} />
          </div>
        </div>
      </div>

      <div ref={carousel} className={``}>
        {loading ? (
          <div style={{ height: carouselHeight }} className="flex w-full h-full gap-5">
            <div className="rounded-3xl bg-gray-900 h-full w-full"></div>
            <div className="rounded-3xl bg-gray-900 h-full w-full"></div>
          </div>
        ) : !upcomingMovies.length ? null : (
          <div className="flex scrollbar-hidden overflow-scroll gap-5 justify-items-stretch">
            {upcomingMovies.slice(0, 2).map((movie) => (
              <MovieCarouselItem key={movie.id} movie={movie}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
