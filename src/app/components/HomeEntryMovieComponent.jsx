import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

import { imagePath, monthNames, genres, tvGenres } from "@/lib/utils";

export default function ({ page }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await (
        await fetch(
          page === "Movies" ? "/api/getPopularMovies" : "/api/getPopularTV",
        )
      ).json();
      if (response.ok) setMovieData(response.response.results[0]);
      else setError(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [page]);

  return (
    <div className="w-full">
      {loading ? (
        <div className="lg:aspect-video relative w-full max-h-[650px] bg-[#2f364b2b] rounded-[30px]">
          <div className="absolute inset-0 -z-30 overflow-hidden rounded-[30px]">
            <div className="w-1/3 h-full swipe-huge bg-gradient-to-l from-transparent via-gray-900/30 to-transparent"></div>
          </div>
          <div className="p-5 pt-14 lg:pl-20 lg:p-14 w-1/2 flex h-full items-end">
            <div className=" flex flex-col gap-3 max-w-96">
              <div className="flex gap-2">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="lg:h-8 h-6 w-20 rounded-full bg-gray-900/70"
                  ></div>
                ))}
              </div>

              <div className="bg-gray-900 lg:h-7 h-5 p-[2px] rounded-full w-5/6"></div>

              <div className="flex flex-col gap-2">
                <div className="bg-gray-900/70 rounded-full h-3 lg:m-[2px] w-5/6"></div>
                <div className="bg-gray-900/70 rounded-full h-3 lg:m-[2px] w-full"></div>
                <div className="bg-gray-900/70 rounded-full h-3 lg:m-[2px] w-1/2"></div>
                <div className="bg-gray-900/70 rounded-full h-3 lg:m-[2px] w-1/4"></div>
                <div className="bg-gray-900/70 rounded-full h-3 lg:m-[2px] w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div></div>
      ) : (
        <div
          onClick={() =>
            router.push(
              page === "Movies" ? `/movie/${movieData.id}` : `/tv/movieData.id`,
            )
          }
          className="w-full group transition-all relative flex lg:aspect-video max-h-[650px] overflow-hidden rounded-[30px]"
        >
          <div
            style={{
              backgroundImage: `url(${imagePath(movieData.backdrop_path, "original")})`,
            }}
            className="appear-opacity absolute -z-10 inset-0 group-hover:scale-[103%] w-full lg:aspect-video max-h-[650px] top-0 left-0 duration-500 transition-all bg-center bg-cover"
          ></div>
          <div className="p-4 pt-14 lg:pl-20 lg:p-14 w-1/2 flex h-full items-end bg-gradient-to-r from-[#020409] to-transparent">
            <div className=" flex flex-col gap-3 rounded-full max-w-96">
              <div className="flex gap-2">
                {movieData.genre_ids
                  .map((id) =>
                    page === "Movies" ? [genres[id], id] : [tvGenres[id], id],
                  )
                  .map(([genre, id]) => (
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      key={Math.random()}
                      href={`/explore?url=${encodeURIComponent(`/api/discoverMovies?with_genres=${id}`)}&title=${`Discover%20Movie%20-%20${genre}`}`}
                      className="p-1 px-4 bg-white/5 hover:bg-[#ffffff17] rounded-full text-base text-nowrap backdrop-blur-xl transition-all cursor-default"
                    >
                      {genre}
                    </Link>
                  ))}
              </div>

              <div className="text-2xl font-bold">
                {page === "Movies" ? movieData.title : movieData.name}
              </div>

              {!movieData.original_language === "en" ? (
                <div>
                  original Title:{" "}
                  {page === "Movies"
                    ? movieData.original_title
                    : movieData.original_name}
                </div>
              ) : null}

              <div className="flex gap-3 items-center text-white/80">
                <div className="flex gap-2 items-center">
                  <FaStar color="orange" />
                  <div>{movieData.vote_average.toFixed(1)}</div>
                </div>

                <div className="text-white/60">|</div>

                <div className="flex gap-2">
                  <div>{page === "Movies" ? "" : "Since"}</div>
                  <div>
                    {
                      monthNames[
                        parseInt(
                          page === "Movies"
                            ? movieData.release_date?.split("-")[1] - 1
                            : movieData.first_air_date?.split("-")[1] - 1,
                        )
                      ]
                    }
                  </div>

                  <div>
                    {page === "Movies"
                      ? movieData.release_date?.split("-")[0]
                      : movieData.first_air_date?.split("-")[0]}
                  </div>
                </div>
              </div>

              {movieData.overview.length ? (
                <div className="text-white/70 max-h-20 lg:text-base text-xs md:max-h-32 lg:max-h-max overflow-scroll scrollbar-hidden">
                  {movieData.overview}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
