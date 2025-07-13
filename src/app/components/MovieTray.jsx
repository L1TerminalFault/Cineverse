"use client";

import { useEffect, useState, useRef } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import MovieCarouselItem from "./MovieCarouselItem";
import MovieListItem from "./MovieListItem";

export const TrayUpcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [swiperLoaded, setSwiperLoaded] = useState(false)

  const fetchUpcomingMovies = async () => {
    setLoading(true);
    try {
      const response = await (await fetch("/api/getUpcomingMovies")).json();
      if (response.ok) setUpcomingMovies(response.response.results);
      else throw Error(response.error);

      if (!response.response.results.length) throw Error("Empty response");
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
    <div className={`p-1 flex-col w-full ${error ? "hidden" : "flex"}`}>
      <div className="p-3 px-6 justify-between flex">
        <div className="text-xl">Upcoming Movies</div>
        <div>
          <div className="hover:bg-gray-900 p-2 transition-all rounded-full ">
            <BsChevronRight size={23} />
          </div>
        </div>
      </div>

      <div className={`flex`}>
        {error ? (
          <div>{Object(error).keys}</div>
        ) : (
          <Swiper
            spaceBetween={20}
            cssMode
            mousewheel
            onSwiper={() => setSwiperLoaded(true)}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
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
            {!swiperLoaded ? (
              <div></div>
            ) : loading ? (
              <>
                {[0, 1, 2, 3].map((item) => {
                  return (
                    <SwiperSlide key={item}>
                      <MovieCarouselItem loading={loading} />
                    </SwiperSlide>
                  );
                })}
              </>
            ) : (
              <>
                {upcomingMovies.map((movie) => {
                  return (
                    <SwiperSlide key={movie.id}>
                      <MovieCarouselItem movie={movie} />
                    </SwiperSlide>
                  );
                })}
              </>
            )}
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
      const response = await (await fetch("/api/getNowPlayingMovies")).json();
      if (response.ok) setNowPlayingMovies(response.response.results);
      else throw Error(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

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

      <div className="w-full sm flex px-1">
        {loading ? (
          <div></div>
        ) : error ? (
          <div>{Object(error).keys}</div>
        ) : !nowPlayingMovies.length ? null : (
          <div className="flex overflow-scroll scrollbar-hidden gap-4 w-max">
            {nowPlayingMovies.map((movie) => {
              return (
                <div key={movie.id}>
                  <SwiperSlide>
                    <MovieListItem movie={movie} />
                  </SwiperSlide>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
