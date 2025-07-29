import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";

export default function ({ movieId, trailerBox, setTrailerBox }) {
  const [down, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  return (
  <div onClick={() => setTrailerBox(false)} className={`transition-all fixed z-40 top-0 left-0 h-screen w-screen`}>
    <div className="flex flex-col z-50 items-center justify-center w-full h-full backdrop-blur-md bg-black/50">
      <div className="flex flex-col h-full w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center max-w-[1700px] w-full p-6">
          <div className="flex w-full justify-end p-5">
              <BsChevronLeft size={35} />
            </div>

        {loading ? (
          <div className="aspect-video appear flex transition-all items-center overflow-hidden justify-center rounded-[30px] w-full h-full bg-black">
            <div className="bg-gray-100 rounded-full p-1 bg-gradient-to-br from-white to-white via-gray-900 animate-spin">
              <div className="bg-black rounded-full p-5">
                
              </div>
            </div>
          </div>
        ) : error ? null : (
        <div className="">
          
        </div>
        )}
          </div>
      </div>
    </div>
    </div>
  );
}
