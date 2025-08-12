import { useState, useEffect } from "react";

import { imagePath } from "@/lib/utils";

export default function () {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movieData, setMovieData] = useState(null);

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
        <div></div>
      ) : error ? (
        <div></div>
      ) : (
        <div
          style={{
            backgroundImage: loading
              ? null
              : `url(${imagePath(movieData.backdrop_path, "original")})`,
          }}
          className="w-full h-[600px] bg-center bg-cover rounded-[40px]"
        ></div>
      )}
    </div>
  );
}
