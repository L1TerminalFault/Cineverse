import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";

export default function ({ movieDetail, downloadBox, setDownloadBox }) {
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [torrentClient, setTorrentClient] = useState("yts");

  const fetchDownloadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/download/${movieDetail.id}?client=${torrentClient}`);
      if (!response.ok) {
      throw new Error("Failed to fetch download data");
      }
      const data = await response.json();
      setTrailer(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
      }


  return (
  <div onClick={() => setDownloadBox(false)} className={`transition-all fixed z-40 top-0 left-0 h-screen w-screen`}>
    <div className="flex flex-col z-50 items-center justify-center w-full h-full backdrop-blur-md bg-black/50">
      <div className="flex flex-col h-full w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center max-h-[100px] w-full p-6">
          <div className="flex w-full justify-end p-5">
              <BsChevronLeft size={35} />
            </div>

        {loading ? (
          <div className=" appear flex transition-all items-center overflow-hidden justify-center rounded-[30px] w-full h-full bg-black">
            <div className="bg-gray-100 rounded-full p-1 bg-gradient-to-br from-white to-white via-gray-900 animate-spin">
              <div className="bg-black rounded-full p-5">
                
              </div>
            </div>
          </div>
        ) : error ? null : (
        <div>
          <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-white text-2xl mb-4">Download Options</h2>
            <div className="flex flex-col space-y-4">
              {trailer.map((item, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg w-full">
                  <h3 className="text-white text-lg">{item.quality}</h3>
                  <p className="text-gray-400">{item.size}</p>
                  <a href={item.link} className="text-blue-400 hover:underline">Download</a>
                </div>
              ))}
            </div>
          </div>
        </div>
                    )}
          </div>
      </div>
    </div>
    </div>
  );
}
