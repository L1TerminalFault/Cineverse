"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BsChevronRight, BsFilter } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import MovieCarouselItem from "./MovieCarouselItem";
import MovieListItem from "./MovieListItem";
import MovieItemLoader from "./MovieItemLoader";

export const Carousel = ({ type, title, url = null }) => {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [swiperLoaded, setSwiperLoaded] = useState(false);
  const [filter, setFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const fetchUpcomingMovies = async () => {
    setLoading(true);
    const endpoint = url
      ? url
      : type === "upcomingMovies"
        ? "/api/getUpcomingMovies"
        : type === "topRatedMovies"
          ? "/api/getTopRatedMovies"
          : type === "onAirTVShows"
            ? "/api/getOnAirTV"
            : type === "topRatedTVShows"
              ? "/api/getTopRatedTV"
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
  }, [type, url]);

  return (
    <div className={`p-1 flex-col w-full ${error ? "hidden" : "flex"}`}>
      <div className="p-5 px-6 justify-between items-center flex">
        <div className="text-xl">{title}</div>
        <div className="flex items-center gap-2">
          <div
            className={`transition-all ${showFilter ? "translate-x-0 opacity-100 max-w-64" : "translate-x-0 opacity-0 max-w-0"} overflow-hidden flex items-center bg-[#060819] text-sm rounded-full`}
          >
            <div
              onClick={() => setFilter(false)}
              className={`${filter ? "" : "bg-[#0d1022]"} hover:bg-gray-900 group transition-all relative p-2 px-4 rounded-l-full`}
            >
              All
            </div>
            <div className="text-gray-700 h-full text-lg">|</div>

            <div
              onClick={() => setFilter(true)}
              className={`${filter ? "bg-[#0d1022]" : ""} hover:bg-gray-900 h-full w-full transition-all p-2 px-3 rounded-r-full`}
            >
              English
            </div>
          </div>

          <div className="flex items-center bg-[#060819] rounded-full">
            <div
              onClick={() => setShowFilter((prev) => !prev)}
              className="hover:bg-gray-900 group transition-all relative p-2 px-4 rounded-l-full"
            >
              <BsFilter size={20} />
            </div>
            <div className="text-gray-700 h-full text-lg">|</div>
            <Link
              href={`/explore?type=${type}&title=${title}`}
              className="hover:bg-gray-900 h-full w-full transition-all p-2 px-3 rounded-r-full "
            >
              <BsChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className={`flex w-full h-min`}>
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
              <>
                {[0, 1, 2, 3].map((item) => (
                  <div
                    className={`h-8 duration-1000 transition-all ${swiperLoaded ? "opacity-100" : "overflow-hidden hidden opacity-0"}`}
                    key={item}
                  >
                    <div className="w-full aspect-video bg-zinc-900"></div>
                  </div>
                ))}
              </>
            ) : loading ? (
              <>
                {[0, 1, 2, 3].map((item) => (
                  <div
                    className={`h-8 duration-1000 transition-all ${swiperLoaded ? "opacity-100" : "overflow-hidden hidden opacity-0"}`}
                    key={item}
                  >
                    <SwiperSlide key={item} className="h-10">
                      <MovieCarouselItem
                        swiperLoaded={swiperLoaded}
                        loading={true}
                      />
                    </SwiperSlide>
                  </div>
                ))}
              </>
            ) : (
              <div className="">
                {upcomingMovies
                  .filter(
                    (movie) =>
                      movie.backdrop_path &&
                      (filter ? movie.original_language === "en" : true),
                  )
                  .map((movie) => {
                    return (
                      <div className="h-8">
                        <SwiperSlide key={movie.id}>
                          <MovieCarouselItem
                            type={type.includes("TV") ? "tv" : "movie"}
                            movie={movie}
                            loading={loading}
                          />
                        </SwiperSlide>
                      </div>
                    );
                  })}
              </div>
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export const Tray = ({
  type,
  title,
  url = null,
  forceLoading = false,
  textShadow = true,
}) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const fetchNowPlayingMovies = async (forceLoading) => {
    if (forceLoading) return;
    setLoading(true);
    const endpoint = url
      ? url
      : type === "nowPlayingMovies"
        ? "/api/getNowPlayingMovies"
        : type === "popularMovies"
          ? "/api/getPopularMovies"
          : type === "popularTVShows"
            ? "/api/getPopularTV"
            : type === "onAirTodayTVShows"
              ? "/api/getOnAirTodayTV"
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
    fetchNowPlayingMovies(forceLoading);
  }, [type, url]);

  return (
    <div className="flex flex-col w-full">
      <div className="p-5 px-6 justify-between items-center flex">
        <div className="md:text-xl w-full text-nowrap overflow-scroll scrollbar-hidden ">
          {title}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`transition-all ${showFilter ? "translate-x-0 opacity-100 max-w-64" : "translate-x-0 opacity-0 max-w-0"} overflow-hidden flex items-center bg-[#060819] text-sm rounded-full`}
          >
            <div
              onClick={() => setFilter(false)}
              className={`${filter ? "" : "bg-[#0d1022]"} hover:bg-gray-900 group transition-all relative p-2 px-4 rounded-l-full`}
            >
              All
            </div>
            <div className="text-gray-700 h-full text-lg">|</div>

            <div
              onClick={() => setFilter(true)}
              className={`${filter ? "bg-[#0d1022]" : ""} hover:bg-gray-900 h-full w-full transition-all p-2 px-3 rounded-r-full`}
            >
              English
            </div>
          </div>

          <div className="flex items-center bg-[#060819] rounded-full">
            <div
              onClick={() => setShowFilter((prev) => !prev)}
              className="hover:bg-gray-900 group transition-all relative p-2 px-4 rounded-l-full"
            >
              <BsFilter size={20} />
            </div>
            <div className="text-gray-700 h-full text-lg">|</div>
            <Link
              onClick={(e) => forceLoading && e.preventDefault()}
              href={`/explore?type=${type}&title=${title}${url ? `&url=${url}` : ""}`}
              className="hover:bg-gray-900 h-full w-full transition-all p-2 px-3 rounded-r-full "
            >
              <BsChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full sm flex px-1">
        {loading ? (
          <div className="overflow-scroll flex scrollbar-hidden gap-5 w-max">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((item) => (
              <MovieItemLoader key={item} />
            ))}
          </div>
        ) : error ? (
          <div className="p-9 bg-white">{Object(error).keys}</div>
        ) : !nowPlayingMovies.length ? null : (
          <div className="flex overflow-scroll scrollbar-hidden gap-5 z-10">
            {nowPlayingMovies
              .filter(
                (movie) =>
                  movie.backdrop_path &&
                  (filter ? movie.original_language === "en" : true),
              )
              .map((movie) => {
                return (
                  <div key={movie.id} className="w-max flex">
                    <MovieListItem
                      type={type.includes("TV") ? "tv" : "movie"}
                      movie={movie}
                      textShadow={textShadow}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
