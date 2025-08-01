const API_KEY = process.env.TMDB_API_KEY;

export const imagePath = (file, size = "w1280") => {
  return `https://image.tmdb.org/t/p/${size}${file}`;
};

export const endpoint = (url) => {
  return url.includes("?")
    ? `https://api.themoviedb.org/3${url}&api_key=${API_KEY}`
    : `https://api.themoviedb.org/3${url}?api_key=${API_KEY}`;
};

export const thepiratebayUrl = (query) => {
  return `https://apibay.org/q.php?q=${encodeURIComponent(query)}`;
};

export const ytsUrl = (query) => {
  return `https://yts.mx/api/v2/list_movies.json?query_term=${encodeURIComponent(query)}`;
  }

export const ytThumbnail = (videoId) => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const formatRuntime = (runtime) => {
  if (!runtime) return "N/A";
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};

export const formatMoney = (value) => {
  if (!value || isNaN(value)) return "$0";

  const absValue = Math.abs(value);
  let formatted;

  if (absValue >= 1_000_000_000) {
    formatted = `$${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (absValue >= 1_000_000) {
    formatted = `$${(value / 1_000_000).toFixed(1)}M`;
  } else if (absValue >= 1_000) {
    formatted = `$${(value / 1_000).toFixed(1)}K`;
  } else {
    formatted = `$${Math.round(value)}`;
  }

  return formatted.replace(".0", "");
};

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export const tvGenres = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};
