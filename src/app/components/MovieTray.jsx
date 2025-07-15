"use client";

import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import MovieCarouselItem from "./MovieCarouselItem";
import MovieListItem from "./MovieListItem";

export const Carousel = ({ type, title }) => {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  const fetchUpcomingMovies = async () => {
    setLoading(true);
    const endpoint =
      type === "upcomingMovies"
        ? "/api/getUpcomingMovies"
        : type === "topRatedMovies"
          ? "/api/getTopRatedMovies"
          : "";
    try {
      const response = await (await fetch(endpoint)).json();
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
        <div className="text-xl">{title}</div>
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
                    <div
                      className={`h-8 duration-1000 transition-all ${swiperLoaded ? "opacity-100" : "overflow-hidden hidden opacity-0"}`}
                      key={item}
                    >
                      <SwiperSlide key={item}>
                        <MovieCarouselItem
                          swiperLoaded={swiperLoaded}
                          loading={true}
                        />
                      </SwiperSlide>
                    </div>
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

export const Tray = ({ type, title }) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNowPlayingMovies = async () => {
    setLoading(true);
    const endpoint =
      type === "nowPlayingMovies"
        ? "/api/getNowPlayingMovies"
        : type === "popularMovies"
          ? "/api/getPopularMovies"
          : "";
    try {
      const response = await (await fetch(endpoint)).json();
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
        <div className="text-xl">{title}</div>
        <div>
          <div className="hover:bg-gray-900 p-2 transition-all rounded-full ">
            <BsChevronRight size={23} />
          </div>
        </div>
      </div>

      <div className="w-full sm flex px-1">
        {loading ? (
          <div className="overflow-scroll flex scrollbar-hidden gap-4 w-max">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((item) => (
              <div key={item} className="w-max flex flex-col">
                <div className="relative bg-[#2f364b3b] overflow-hidden w-[145px] h-[217.5px] rounded-2xl">
                  <div className="swipe p-1 h-full bg-gradient-to-r from-[#0000] via-gray-900 to-[#0000]"></div>
                </div>

                <div className="flex flex-col gap-[6px] p-2 px-1 ">
                  <div className="h-4 rounded-full bg-[#2f364b2f] w-3/4"></div>
                  <div className="h-3 rounded-full bg-[#2f364b2a] w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div>{Object(error).keys}</div>
        ) : !nowPlayingMovies.length ? null : (
          <div className="flex overflow-scroll scrollbar-hidden gap-4 w-full">
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
