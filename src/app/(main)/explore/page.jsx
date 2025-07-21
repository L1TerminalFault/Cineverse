"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import TopBar from "@/app/components/TopBar";
import MovieListItem from "@/app/components/MovieListItem";
import MovieItemLoader from "@/app/components/MovieItemLoader";

const movieIds = [];

export default function () {
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [readyToFetch, setReadyToFetch] = useState(false);
  const loaderRef = useRef(null);
  const [endOfData, setEndOfData] = useState(false);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const title = searchParams.get("title");

  const url = searchParams.get("url")
    ? decodeURIComponent(searchParams.get("url"))
    : type === "upcomingMovies"
      ? "/api/getUpcomingMovies"
      : type === "topRatedMovies"
        ? "/api/getTopRatedMovies"
        : type === "onAirTVShows"
          ? "/api/getOnAirTV"
          : type === "topRatedTVShows"
            ? "/api/getTopRatedTV"
            : type === "nowPlayingMovies"
              ? "/api/getNowPlayingMovies"
              : type === "popularMovies"
                ? "/api/getPopularMovies"
                : type === "popularTVShows"
                  ? "/api/getPopularTV"
                  : type === "onAirTodayTVShows"
                    ? "/api/getOnAirTodayTV"
                    : "";

  const fetchData = async () => {
    if (totalPages && page > totalPages) {
      setEndOfData(true);
      return;
    }

    setLoading(true);
    const endpoint =
      url + (url.includes("?") ? `&page=${page}` : `?page=${page}`);
    try {
      const response = await (
        await fetch(endpoint, { cache: "no-store" })
      ).json();
      if (response.ok) {
        if (!totalPages) {
          response.response.results.forEach((movie) => {
            movieIds.push(movie.id);
          });
          setFetchedData(response.response.results);
        } else {
          const temp = [];
          response.response.results.forEach((movie) => {
            if (!movieIds.includes(movie.id)) {
              movieIds.push(movie.id);
              temp.push(movie);
            }
          });
          setFetchedData((prev) => [...prev, ...temp]);
        }
        setTotalPages((prev) =>
          totalPages ? prev : response.response.total_pages,
        );
      } else throw Error(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setReadyToFetch(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !endOfData && readyToFetch) {
          setReadyToFetch(false);
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
  }, [loaderRef, page, totalPages]);

  return (
    <div className="w-full flex items-center justify-center">
      <TopBar setPage={null} />

      <div className="relative 2xl:w-4/5 w-full flex items-center justify-center z-0">
        <div className="p-3 pt-16 w-full flex justify-center flex-col">
          <div className="p-5 px-6 justify-between items-center w-full flex">
            <div className="text-xl">
              {title.includes("-") ? (
                <>
                  <span className="opacity-65">
                    {title.split("-")[0]}
                    <span className="opacity-45">-</span>{" "}
                  </span>
                  <span>{title.split("-")[1]}</span>
                </>
              ) : (
                title
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-center align-middle">
            {error ? null : (
              <div className="flex flex-wrap scrollbar-hidden justify-evenly gap-5">
                {loading && !fetchedData.length
                  ? Array.from({ length: 30 }, (_, i) => i + 1).map((item) => (
                      <MovieItemLoader key={item} />
                    ))
                  : !fetchedData.length
                    ? null
                    : fetchedData.map((movie) => (
                        <MovieListItem
                          extendOnHover={false}
                          key={movie.id}
                          movie={movie}
                          type={url.includes("TV") ? "tv" : "movie"}
                          loading={loading}
                        />
                      ))}
              </div>
            )}
          </div>

          <div
            ref={loaderRef}
            className="p-6 w-full flex items-center justify-center gap-3"
          >
            <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-0" />
            <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-100" />
            <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-200" />
            <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-300" />
            <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-400" />
            <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-500" />
            <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
