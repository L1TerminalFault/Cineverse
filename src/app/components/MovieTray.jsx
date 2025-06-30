"use client";

import { useEffect, useState, useCallback } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import MovieCarouselItem from "./MovieCarouselItem";
import MovieListItem from "./MovieListItem";

export const TrayUpcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carouselHeight, setCarouselHeight] = useState(null);
  const [carouselWidth, setCarouselWidth] = useState(null)

  const carousel = useCallback((node) => {
    if (node) {
      const carouselFullWidth = node.getBoundingClientRect().width;

      const calculateHeight = () => {
        if (window.innerWidth < 1280) {
          setCarouselHeight(Math.floor((carouselFullWidth - 20) / 2 / (16 / 9)))
          setCarouselWidth(Math.floor((carouselFullWidth - 20) / 2))
        } else if (window.innerWidth < 1800) {
          setCarouselHeight(Math.floor((carouselFullWidth - 40) / 3 / (16 / 9)))
          setCarouselWidth(Math.floor((carouselFullWidth - 40) / 3))
        } else {
          setCarouselHeight(Math.floor((carouselFullWidth - 60) / 4 / (16 / 9)))
          setCarouselWidth(Math.floor((carouselFullWidth - 60) / 4))
        }
        const carouselCalcHeight = Math.floor(
          window.innerWidth < 1280
            ? (carouselFullWidth - 20) / 2 / (16 / 9)
            // : window.screen.width < 1800
            // ? (carouselFullWidth - 40) / 3 / (16 / 9)
            : (carouselFullWidth - 60) / 4 / (16 / 9)
        );

        setCarouselHeight(carouselCalcHeight);
      };

      calculateHeight();
      window.addEventListener("resize", calculateHeight);
    }
  });

  const fetchUpcomingMovies = async () => {
    setLoading(true);
    try {
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
    <div className="p-1 flex flex-col w-full">
      <div className="p-3 px-6 justify-between flex">
        <div className="text-xl">Upcoming Movies</div>
        <div>
          <div className="hover:bg-gray-900 p-2 transition-all rounded-full ">
            <BsChevronRight size={23} />
          </div>
        </div>
      </div>

      <div ref={carousel} className={`h-[${carouselHeight}px] flex`}>
        {loading ? (
          <div
            style={{ height: carouselHeight }}
            className="flex w-full bg-gray-800 gap-5"
          >
          </div>
        ) : !upcomingMovies.length ? null : (
          <Swiper
            spaceBetween={20}
            cssMode
            mousewheel
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
              1800: {
                slidesPerView: 4,
              },
            }}
          >
            {upcomingMovies.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
                  <MovieCarouselItem movie={movie} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export const TrayNowPlaying = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNowPlayingMovies = async () => {
    setLoading(true);
    try {
      const response = await (await fetch('/api/getNowPlayingMovies')).json()
      if (response.ok) setNowPlayingMovies(response.response.results)
      else throw Error(response.error)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlayingMovies()
  }, [])

  return (
    <div className="flex flex-col w-full pt-2">
      <div className="p-3 px-6 justify-between flex">
        <div className="text-xl">Now In Theaters</div>
        <div>
          <div className="hover:bg-gray-900 p-2 transition-all rounded-full ">
            <BsChevronRight size={23} />
          </div>
        </div>
      </div>

      <div className="w-full xl flex px-1">
        {loading ? (
          <div></div>
        ) : !nowPlayingMovies.length ? null : (
          <Swiper
            spaceBetween={15}
            cssMode
            mousewheel
            breakpoints={{
              0: {
                slidesPerView: 3,
              },
              550: {
                slidesPerView: 4,
              },
              750: {
                slidesPerView: 5,
              },
              900: {
                slidesPerView: 6,
              },
              1100: {
                slidesPerView: 7,
              },
              1280: {
                slidesPerView: 8,
              },
              1500: {
                slidesPerView: 10,
              },
            }}
          >
            {nowPlayingMovies.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
                  <MovieListItem movie={movie} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};
