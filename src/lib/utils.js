const API_KEY = process.env.TMDB_API_KEY

export const imagePath = (file, size='w1280') => {
  return `https://image.tmdb.org/t/p/${size}${file}`
}

export const endpoint = (url) => {
  return url.includes('?') ? `https://api.themoviedb.org/3${url}&api_key=${API_KEY}` : `https://api.themoviedb.org/3${url}?api_key=${API_KEY}`
}