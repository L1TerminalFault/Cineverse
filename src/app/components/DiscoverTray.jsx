import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  FaFire,
  FaUniversalAccess,
  FaHatWizard,
  FaBookOpen,
  FaLaughSquint,
  FaGavel,
  FaBalanceScale,
  FaChild,
  FaPuzzlePiece,
  FaNewspaper,
  FaRobot,
  FaVideo,
  FaUserTie,
  FaGlobeAmericas,
  FaHorseHead,
  FaFistRaised,
  FaFilm,
  FaTheaterMasks,
  FaUserNinja,
  FaCameraRetro,
  FaHardHat,
  FaQuestionCircle,
  FaBroadcastTower,
  FaSpa,
  FaMicrophone,
  FaGlobe,
  FaHorse,
  FaDumbbell,
} from "react-icons/fa";
import { MdAnimation, MdTheaters } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";
import {
  GiPoliceOfficerHead,
  GiSkullCrossedBones,
  GiCrossedSwords,
  GiTopHat,
} from "react-icons/gi";

import { genres as movieGenre, tvGenres } from "@/lib/utils";
import MovieListItem from "./MovieListItem";
import fireIcon from "@/../public/fire-icon.png";
import MovieItemLoader from "./MovieItemLoader";

export default function ({ type }) {
  const genreIcons =
    type === "movie"
      ? {
          28: ({ color }) => <FaBolt color={color} size={26} />, // Action
          12: ({ color }) => <FaCompass color={color} size={26} />, // Adventure
          16: ({ color }) => <MdAnimation color={color} size={26} />, // Animation
          35: ({ color }) => <FaLaugh color={color} size={26} />, // Comedy
          80: ({ color }) => <GiPoliceOfficerHead color={color} size={26} />, // Crime
          99: ({ color }) => <RiVideoFill color={color} size={26} />, // Documentary
          18: ({ color }) => <MdTheaters color={color} size={26} />, // Drama
          10751: ({ color }) => <FaUsers color={color} size={26} />, // Family
          14: ({ color }) => <FaMagic color={color} size={26} />, // Fantasy
          36: ({ color }) => <FaLandmark color={color} size={26} />, // History
          27: ({ color }) => <GiSkullCrossedBones color={color} size={26} />, // Horror
          10402: ({ color }) => <FaMusic color={color} size={26} />, // Music
          9648: ({ color }) => <FaSearch color={color} size={26} />, // Mystery
          10749: ({ color }) => <FaHeart color={color} size={26} />, // Romance
          878: ({ color }) => <FaRocket color={color} size={26} />, // Science Fiction (Sci-Fi)
          10770: ({ color }) => <FaTv color={color} size={26} />, // TV Movie
          53: ({ color }) => <FaEye color={color} size={26} />, // Thriller
          10752: ({ color }) => <GiCrossedSwords color={color} size={26} />, // War
          37: ({ color }) => <GiTopHat color={color} size={26} />, // Western
        }
      : {
          10759: ({ color }) => <FaDumbbell color={color} size={26} />, // Action & Adventure
          16: ({ color }) => <MdAnimation color={color} size={26} />, // Animation
          35: ({ color }) => <FaTheaterMasks color={color} size={26} />, // Comedy
          80: ({ color }) => <FaUserNinja color={color} size={26} />, // Crime
          99: ({ color }) => <FaCameraRetro color={color} size={26} />, // Documentary
          18: ({ color }) => <MdTheaters color={color} size={26} />, // Drama
          10751: ({ color }) => <FaUsers color={color} size={26} />, // Family
          10762: ({ color }) => <FaPuzzlePiece color={color} size={26} />, // Kids
          9648: ({ color }) => <FaQuestionCircle color={color} size={26} />, // Mystery
          10763: ({ color }) => <FaNewspaper color={color} size={26} />, // News
          10764: ({ color }) => <FaBroadcastTower color={color} size={26} />, // Reality
          10765: ({ color }) => <FaRocket color={color} size={26} />, // Sci‑Fi & Fantasy
          10766: ({ color }) => <FaSpa color={color} size={26} />, // Soap
          10767: ({ color }) => <FaMicrophone color={color} size={26} />, // Talk
          10768: ({ color }) => <FaGlobe color={color} size={26} />, // War & Politics
          37: ({ color }) => <FaHorse color={color} size={26} />, // Western
        };
  const GenreIcon = ({ genreId, color }) => {
    const Icon = genreIcons[genreId] || (() => null);
    return <Icon color={color} />;
  };

  const genres = type === "movie" ? movieGenre : tvGenres;

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movieResults, setMovieResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = !selectedGenre
    ? type === "movie"
      ? "/api/getTrendingMovies"
      : "/api/getTrendingTV"
    : type === "movie"
      ? `/api/discoverMovies?with_genres=${selectedGenre}`
      : `/api/discoverTV?with_genres=${selectedGenre}`;

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await (await fetch(url)).json();
      if (response.ok) setMovieResults(response.response.results);
      else throw Error(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedGenre(null);
    const genreTray = document.getElementById("genreTray");
    genreTray.scrollTo({ left: 0, behavior: "smooth" });
  }, [type]);

  useEffect(() => {
    fetchMovies();
    const resultTray = document.getElementById("resultTray");
    resultTray?.scrollTo({ left: 0, behavior: "smooth" });
  }, [selectedGenre, type]);

  return (
    <div className="flex flex-col mt-3">
      <div className="px-4">
        <div id="genreTray" className="w-full overflow-scroll scrollbar-hidden">
          <div className="w-max flex gap-3">
            <div
              className={`p-2 px-4 flex items-center justify-center gap-2 rounded-2xl border transition-all cursor-default ${selectedGenre ? "border-[#141624] bg-[#14162480] hover:border-[#202330] hover:bg-[#20233080]" : "border-[#252835] bg-[#25283580]"}`}
              onClick={() => setSelectedGenre(null)}
            >
              <Image
                src={fireIcon}
                className={`${!selectedGenre ? "opacity-100" : "opacity-60"} w-6`}
                alt=""
              />
              <div>Trending</div>
            </div>

            {Object.entries(genres).map(([id, genre]) => (
              <div
                key={id}
                className={`flex py-4 items-center justify-center gap-2 px-6 rounded-2xl border cursor-default transition-all ${
                  selectedGenre === id
                    ? "border-[#252835] bg-[#25283580]"
                    : "border-[#141624] bg-[#14162480] hover:border-[#202330] hover:bg-[#20233080]"
                }`}
                onClick={() => setSelectedGenre(id)}
              >
                <GenreIcon
                  genreId={id}
                  color={`${selectedGenre === id ? "" : "#ffffff99"}`}
                />
                {genre}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col w-full pt-0">
          <div className="p-2 pb-3 px-8 items-center justify-between flex">
            <div className="">
              {selectedGenre ? genres[selectedGenre] : "Trending"}
            </div>
            <Link
              href={`/explore?url=${encodeURIComponent(url)}&title=Discover%20${type === "movie" ? "Movie" : "TV"}%20-%20${encodeURIComponent(selectedGenre ? genres[selectedGenre] : "Trending")}`}
            >
              <div className="hover:bg-gray-900 p-2 transition-all rounded-full ">
                <BsChevronRight size={15} />
              </div>
            </Link>
          </div>

          <div className="w-full sm flex px-1">
            {loading ? (
              <div className="overflow-scroll flex scrollbar-hidden gap-5 w-max">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((item) => (
                  <MovieItemLoader key={item} />
                ))}
              </div>
            ) : error ? (
              <div>{Object(error).keys}</div>
            ) : !movieResults.length ? null : (
              <div
                id="resultTray"
                className="flex overflow-scroll scrollbar-hidden gap-5"
              >
                {movieResults
                  .filter((movie) => movie.backdrop_path)
                  .sort((a, b) =>
                    type === "movie"
                      ? a.release_date?.split("-")[0] <
                        b.release_date?.split("-")[0]
                        ? 1
                        : -1
                      : 0,
                  )
                  .map((movie) => {
                    return (
                      <div key={movie.id} className="w-max flex">
                        <SwiperSlide>
                          <MovieListItem movie={movie} type={type} />
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
