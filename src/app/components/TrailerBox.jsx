import { useEffect, useState } from "react";

export default function ({ movieId, trailerBox, setTrailerBox }) {
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTrailerData = async () => {
    setLoading(true);
    try {
      const response = await (
        await fetch(`/api/getMovieInfo?id=${movieId}&type=trailer`)
      ).json();
      if (response.ok) {
        const results = response.response.results;
        if (results && results.length > 0) {
          const trailerList = results.filter(
            (video) =>
              video.type === "Trailer" &&
              video.site === "YouTube" &&
              video.official,
          );
          const hdTrailer = trailerList.find((video) => video.size === 1080);
          const trailer = hdTrailer || trailerList[0] || results[0]

          if (trailer) {
            setTrailer(trailer);
          } else {
            setError("No trailer found");
          }
        } else {
          setError("No videos available for this movie");
        }
      } else throw Error(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailerData();
  }, []);

  return (
  <div onClick={() => setTrailerBox(false)} className={`transition-all fixed z-40 top-0 left-0 h-screen w-screen`}>
    <div className="flex flex-col z-50 items-center justify-center w-full h-full backdrop-blur-md bg-black/50">
      <div className="flex flex-col h-full w-full items-center justify-center">
          <div className="flex items-center justify-center w-full p-6">
        {loading ? (
          <div className="aspect-video appear flex transition-all items-center overflow-hidden justify-center rounded-[30px] w-full h-full bg-black">
            <div className="bg-gray-100 rounded-full p-1 bg-gradient-to-br from-white to-white via-gray-900 animate-spin">
              <div className="bg-black rounded-full p-5">
                
              </div>
            </div>
          </div>
        ) : error ? null : (
            <iframe
              className="bg-black w-full h-full aspect-video rounded-[30px]"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0&mute=0&controls=1&modestbranding=1&rel=0&showinfo=1`}
              title={trailer.name}
              allowFullScreen
            ></iframe>
        )}
        </div>
      </div>
    </div>
    </div>
  );
}
