"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { BsFilter, BsChevronRight } from "react-icons/bs";
import { TbFilter } from "react-icons/tb";
import { HiTranslate } from "react-icons/hi";

import TopBar from "@/app/components/TopBar";
import MovieListItem from "@/app/components/MovieListItem";
import MovieItemLoader from "@/app/components/MovieItemLoader";

const movieIds = [];

export default function () {
  const searchParams = useSearchParams();

  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [adult, setAdult] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("term") || "");
  const [language, setLanguage] = useState("");
  const [type, setType] = useState(searchParams.get("type"));
  const [totalPages, setTotalPages] = useState(null);
  const [readyToFetch, setReadyToFetch] = useState(false);
  const loaderRef = useRef(null);
  const languageRef = useRef(null);
  const [endOfData, setEndOfData] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const fetchData = async () => {
    if (totalPages && page > totalPages) {
      setEndOfData(true);
      return;
    }

    setLoading(true);
    const endpoint = `/api/search${type === "movies" ? "Movies" : "TV"}?query=${encodeURIComponent(searchTerm)}&page=${page}${adult ? `&include_adult=${adult}` : ""}${language.length ? `&language=${language}` : ""}`;
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

  const fetchLanguages = async () => {
    try {
      const response = await (await fetch("/api/getLanguages")).json();
      if (response.ok) {
        setLanguageOptions(response.response);
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const submitSearch = (formData) => {
    const term = formData.get("search");
    window.location.href = `/search?term=${encodeURIComponent(term)}&type=${type}`;
  };

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    window.location.href = `/search?term=${encodeURIComponent(searchTerm)}&type=${type}&include_adult=${adult}${language ? `&language=${language}` : ""}`;
  }, [adult, language]);

  useEffect(() => {
    fetchData();
    fetchLanguages();
  }, [page, type]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !endOfData && readyToFetch) {
          setReadyToFetch(false);
          setPage((prev) => prev + 1);
          console.log(totalPages, page);
        }
      },
      { threshold: 0 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
  }, [loaderRef, page, totalPages]);

  useEffect(() => {
    let timeoutId;

    if (showLanguageOptions) {
      // Defer adding the listener to avoid catching the opening click
      timeoutId = setTimeout(() => {
        const handleClickOutside = (event) => {
          if (
            languageRef.current &&
            !languageRef.current.contains(event.target)
          ) {
            setShowLanguageOptions(false);
          }
        };

        window.addEventListener("click", handleClickOutside);

        // Cleanup
        const cleanup = () => {
          window.removeEventListener("click", handleClickOutside);
        };

        // Attach cleanup on unmount or hide
        effectCleanupRef.current = cleanup;
      }, 0);
    }

    return () => {
      clearTimeout(timeoutId);
      if (effectCleanupRef.current) {
        effectCleanupRef.current();
        effectCleanupRef.current = null;
      }
    };
  }, [showLanguageOptions]);

  const effectCleanupRef = useRef(null);

  return (
    <div className="w-full flex items-center justify-center">
      <TopBar setPage={null} submitSearch={submitSearch} value={searchTerm} />

      <div className="relative 2xl:w-4/5 w-full flex items-center justify-center z-0">
        <div className="p-3 pt-16 w-full flex justify-center flex-col">
          <div className="p-5 px-6 justify-between items-center w-full flex">
            <div className="text-xl inline">
              <span className="opacity-65">
                {"Search " + (type === "movies" ? "Movies" : "TV Shows")}{" "}
                <span className="opacity-45">-</span>{" "}
              </span>
              <span>{searchTerm}</span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`transition-all ${showFilter ? "translate-x-0 opacity-100 max-w-64" : "translate-x-0 opacity-0 max-w-0"} overflow-hidden flex items-center bg-[#060819] text-sm rounded-full`}
              >
                <div
                  onClick={() => setAdult(false)}
                  className={`${adult ? "" : "bg-[#0d1022]"} hover:bg-gray-900 group transition-all relative p-2 px-4 rounded-l-full`}
                >
                  All
                </div>
                <div className="text-gray-700 h-full text-lg">|</div>

                <div
                  onClick={() => setAdult(true)}
                  className={`${adult ? "bg-[#0d1022]" : ""} text-nowrap hover:bg-gray-900 h-full w-full transition-all p-2 px-3 rounded-r-full`}
                >
                  Include Adult
                </div>
              </div>

              <div className="flex relative items-center bg-[#060819] rounded-full">
                <div
                  onClick={() => setShowFilter((prev) => !prev)}
                  className="hover:bg-gray-900 group transition-all relative p-2 px-4 rounded-l-full"
                >
                  <BsFilter size={20} />
                </div>
                <div className="text-gray-700 h-full text-lg">|</div>
                <div
                  onClick={() => {
                    setShowLanguageOptions(true);
                    // setTimeout(700, () => {
                    // window.addEventListener("click", (event) => {
                    //    console.log("something happened");
                    // if (
                    //  languageRef.current &&
                    //  !languageRef.current.contains(event.target)
                    //  ) {
                    //   setShowLanguageOptions(false);
                    //  }
                    //  });

                    // })
                  }}
                  className="hover:bg-gray-900 relative h-full group w-full transition-all p-2 px-4 rounded-r-full "
                >
                  <TbFilter size={18} />
                  <div className="absolute bottom-1 right-[13px] p-[1px] group-hover:bg-gray-900 transition-all text-xs bg-[#060819] rounded-full">
                    <HiTranslate size={10} />
                  </div>
                </div>

                <div
                  className={`top-6 right-2 z-50 absolute transition-all duration-500 ${showLanguageOptions ? "translate-x-0 opacity-100 max-w-64" : "translate-x-0 opacity-0 max-w-0"} overflow-hidden flex items-center`}
                >
                  <div
                    ref={languageRef}
                    className="  flex flex-col gap-2 max-h-[300px] overflow-y-auto scrollbar-hidden bg-[#ffffff1f] shadow-black shadow-md backdrop-blur-md p-2 rounded-xl"
                  >
                    {languageOptions
                      .sort((a, b) =>
                        a.english_name.localeCompare(b.english_name),
                      )
                      .map((lang) => (
                        <div
                          key={lang.iso_639_1}
                          className={`p-2 px-4 text-xs rounded-full cursor-pointer transition-all ${
                            language === lang.iso_639_1
                              ? "bg-[#0d1022] text-white"
                              : "bg-[#060819] text-gray-400 hover:bg-gray-900"
                          }`}
                          onClick={() => setLanguage(lang.iso_639_1)}
                        >
                          {lang.english_name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center z-0 align-middle">
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
                          type={type === "movies" ? "movie" : "tv"}
                          loading={loading}
                        />
                      ))}
              </div>
            )}
          </div>

          <div
            ref={loaderRef}
            className="p-3 w-full flex items-center justify-center gap-3"
          >
            {endOfData ? null : (
              <>
                <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-0" />
                <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-100" />
                <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-200" />
                <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-300" />
                <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-400" />
                <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-500" />
                <div className="bg-gray-600 p-[6px] rounded-md animate-wiggle duration-700 delay-600" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
