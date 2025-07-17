import { useState, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { BsChevronRight } from "react-icons/bs";
import {
  FaBolt,
  FaHeart,
  FaMusic,
  FaTv,
  FaRocket,
  FaLaugh,
  FaEye,
  FaUsers,
  FaLandmark,
  FaCompass,
  FaMagic,
  FaSearch,
} from "react-icons/fa";
import { MdAnimation, MdTheaters } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";
import {
  GiPoliceOfficerHead,
  GiSkullCrossedBones,
  GiCowboyHolster,
  GiCrossedSwords,
} from "react-icons/gi";

import { genres } from "@/lib/utils";
import MovieListItem from "./MovieListItem";

const genreIcons = {
  28: () => <FaBolt />, // Action
  12: () => <FaCompass />, // Adventure
  16: () => <MdAnimation />, // Animation
  35: () => <FaLaugh />, // Comedy
  80: () => <GiPoliceOfficerHead />, // Crime
  99: () => <RiVideoFill />, // Documentary
  18: () => <MdTheaters />, // Drama
  10751: () => <FaUsers />, // Family
  14: () => <FaMagic />, // Fantasy
  36: () => <FaLandmark />, // History
  27: () => <GiSkullCrossedBones />, // Horror
  10402: () => <FaMusic />, // Music
  9648: () => <FaSearch />, // Mystery
  10749: () => <FaHeart />, // Romance
  878: () => <FaRocket />, // Science Fiction (Sci-Fi)
  10770: () => <FaTv />, // TV Movie
  53: () => <FaEye />, // Thriller
  10752: () => <GiCrossedSwords />, // War
  37: () => <GiCowboyHolster />, // Western
};

const GenreIcon = ({ genreId }) => {
  const Icon = genreIcons[genreId] || (() => null);
  return <Icon />;
};

export default function () {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const [movieResults, setMovieResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await (
        await fetch(
          !selectedGenre
            ? "/api/getTrendingMovies?day"
            : `/api/discoverMovies?with_genres=${selectedGenre}`,
        )
      ).json();
      if (response.ok) setMovieResults(response.response.results);
      else throw Error(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre]);

  return (
    <div className="flex flex-col ">
      <div className="w-full overflow-scroll scrollbar-hidden">
        <div className="w-max p-2 flex gap-3">
          <div
            className={`p-2 px-5 rounded-2xl border transition-all cursor-default ${selectedGenre ? "border-[#141624] bg-[#14162480] hover:border-[#202330] hover:bg-[#20233080]" : "border-[#252835] bg-[#25283580]"}`}
            onClick={() => setSelectedGenre(null)}
          >
            <div>Trending</div>
          </div>

          {Object.entries(genres).map(([id, genre]) => (
            <div
              key={id}
              className={`flex p-2 px-5 rounded-2xl border cursor-default transition-all ${
                selectedGenre === id
                  ? "border-[#252835] bg-[#25283580]"
                  : "border-[#141624] bg-[#14162480] hover:border-[#202330] hover:bg-[#20233080]"
              }`}
              onClick={() => setSelectedGenre(id)}
            >
              <GenreIcon genreId={id} className="" />
              {genre}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-col w-full pt-0">
          <div className="p-2 pb-3 px-8 items-center justify-between flex">
            <div className="text-s">
              {selectedGenre ? genres[selectedGenre] : "Trending"}
            </div>
            <div>
              <div className="hover:bg-gray-900 p-2 transition-all rounded-full ">
                <BsChevronRight size={15} />
              </div>
            </div>
          </div>

          <div className="w-full sm flex px-1">
            {loading ? (
              <div className="overflow-scroll flex scrollbar-hidden gap-5 w-max">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((item) => (
                  <div key={item} className="w-max flex flex-col">
                    <div className="relative bg-[#2f364b3b] overflow-hidden w-[145px] h-[217.5px] rounded-3xl">
                      <div className="swipe p-1 h-full bg-gradient-to-r from-[#0000] via-gray-900 to-[#0000]"></div>
                    </div>

                    <div className="flex flex-col gap-[6px] p-2 px-3 ">
                      <div className="h-4 rounded-full bg-[#2f364b2f] w-3/4"></div>
                      <div className="h-3 rounded-full bg-[#2f364b2a] w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div>{Object(error).keys}</div>
            ) : !movieResults.length ? null : (
              <div className="flex overflow-scroll scrollbar-hidden gap-5">
                {movieResults.map((movie) => {
                  return (
                    <div key={movie.id} className="w-max flex">
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
      </div>
    </div>
  );
}

const Tray = ({ error, loading, results }) => {
  return (
    <div className="flex flex-col w-full pt-2">
      {/** <div className="p-3 px-6 justify-between flex">
        <div className="text-xl">{title}</div>
        <div>
          <div className="hover:bg-gray-900 p-2 transition-all rounded-full ">
            <BsChevronRight size={23} />
          </div>
        </div>
      </div> **/}

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
        ) : !results.length ? null : (
          <div className="flex overflow-scroll scrollbar-hidden gap-5">
            {results.map((movie) => {
              return (
                <div key={movie.id} className="w-max flex">
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
