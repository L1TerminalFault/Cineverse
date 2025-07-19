"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import TopBar from "@/app/components/TopBar";
import MovieListItem from "@/app/components/MovieListItem";
import MovieItemLoader from "@/app/components/MovieItemLoader";

export default function () {
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const loaderRef = useRef(null)
  
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const title = searchParams.get("title");

  const url =
    searchParams.get("url") || type === "upcomingMovies"
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
    setLoading(true);
    const endpoint = url + url.includes("?") ? `&page=${page}` : `?page=${page}`
    alert(endpoint)
    try {
      const response = await (await fetch(endpoint)).json();
      if (response.ok) setFetchedData(response.response.results);
      else throw Error(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 0 }
    )

    if (loaderRef.current) observer.observe(loaderRef.current)
  }, [loaderRef, page, totalPages])

  return (
    <div className="w-full flex items-center justify-center">
      <TopBar
        page={type?.includes("TV") || url.includes("TV") ? "TV" : "Movies"}
        setPage={null}
      />

      <div className="relative 2xl:w-4/5 w-full flex items-center justify-center z-0">
        <div className="p-3 pt-16 w-full flex justify-center flex-col">
          <div className="p-5 px-6 justify-between items-center w-full flex">
            <div className="text-xl">{title}</div>
          </div>

          <div className="w-full flex items-center justify-center align-middle">
            {error ? null : (
              <div className="flex flex-wrap scrollbar-hidden justify-center gap-5">
                {loading
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

          <div ref={loaderRef} className="bg-white p-2 w-full">
            
          </div>
        </div>
      </div>
    </div>
  );
}
