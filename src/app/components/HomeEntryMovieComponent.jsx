import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa6";
import Link from "next/link";

import { imagePath, monthNames, genres } from "@/lib/utils";

export default function () {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await (await fetch("/api/getPopularMovies")).json();
      if (response.ok) setMovieData(response.response.results[0]);
      else setError(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div className="lg:aspect-video relative w-full max-h-[650px] bg-gray-900/30 rounded-[30px]">
          <div className="absolute inset-0 -z-30">
            <div className="w-1/2 h-full swipe-huge bg-gradient-to-l from-transparent via-gray-950/90 to-transparent"></div>
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
                <div className="bg-gray-900/70 rounded-full lg:h-5 h-3 lg:m-[2px] w-5/6"></div>
                <div className="bg-gray-900/70 rounded-full lg:h-5 h-3 lg:m-[2px] w-full"></div>
                <div className="bg-gray-900/70 rounded-full lg:h-5 h-3 lg:m-[2px] w-1/2"></div>
                <div className="bg-gray-900/70 rounded-full lg:h-5 h-3 lg:m-[2px] w-1/4"></div>
                <div className="bg-gray-900/70 rounded-full lg:h-5 h-3 lg:m-[2px] w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div></div>
      ) : (
        <div
          onClick={() => router.push(`/movie/${movieData.id}`)}
          style={{
            backgroundImage: loading
              ? null
              : `url(${imagePath(movieData.backdrop_path, "original")})`,
          }}
          className="w-full flex lg:aspect-video max-h-[650px] bg-center bg-cover overflow-hidden rounded-[30px]"
        >
          <div className="p-4 pt-14 lg:pl-20 lg:p-14 w-1/2 flex h-full items-end bg-gradient-to-r from-[#020409] to-transparent">
            <div className=" flex flex-col gap-3 rounded-full max-w-96">
              <div className="flex gap-2">
                {movieData.genre_ids
                  .map((id) => [genres[id], id])
                  .map(([genre, id]) => (
                    <Link
                      onClick={(e) => e.stopPropagation()}
                      key={genre}
                      href={`/explore?url=${encodeURIComponent(`/api/discoverMovies?with_genres=${id}`)}&title=${`Discover%20Movie%20-%20${genre}`}`}
                      className="p-1 px-4 bg-white/5 hover:bg-[#ffffff17] rounded-full text-base text-nowrap backdrop-blur-xl transition-all cursor-default"
                    >
                      {genre}
                    </Link>
                  ))}
              </div>

              <div className="text-2xl font-bold">{movieData.title}</div>

              {!movieData.original_language === "en" ? (
                <div>original Title: {movieData.original_title}</div>
              ) : null}

              <div className="flex gap-3 items-center text-white/80">
                <div className="flex gap-2 items-center">
                  <FaStar color="orange" />
                  <div>{movieData.vote_average.toFixed(1)}</div>
                </div>

                <div className="text-white/60">|</div>

                <div className="flex gap-2">
                  <div>
                    {
                      monthNames[
                        parseInt(movieData.release_date.split("-")[1] - 1)
                      ]
                    }
                  </div>

                  <div>{movieData.release_date.split("-")[0]}</div>
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
