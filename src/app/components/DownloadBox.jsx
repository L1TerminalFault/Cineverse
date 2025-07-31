import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";

export default function ({ movieDetail, downloadBox, setDownloadBox }) {
  const [downloadList, setDownloadList] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <div
      onClick={() => setTrailerBox(false)}
      className={`transition-all fixed z-40 top-0 left-0 h-screen w-screen`}
    >
      <div className="flex flex-col z-50 items-center justify-center w-full h-full backdrop-blur-md bg-black/50">
        <div className="flex h-full w-full gap-2 items-center justify-center">
          <div className="flex flex-col gap-3 items-center justify-center max-w-[1000px] w-full p-6 lg:p-16 pt-0">
            <div className="flex w-full justify-between p-4 pt-0">
              <div></div>

              <BsChevronLeft size={30} />
            </div>

            <div className="w-full h-[calc(100vh*0.6)] appear flex flex-col p-5 transition-all items-center overflow-hidden rounded-[30px] bg-gray-950/90">
              <div className="flex items-baseline justify-center w-full gap-4">
                <div className="text-white text-sm p-1 px-4 rounded-xl bg-gray-800">
                  TPB
                </div>
                <div className="text-white text-sm p-1 px-4 rounded-xl bg-gray-800">
                  TPB
                </div>
                <div className="text-white text-sm p-1 px-4 rounded-xl bg-gray-800">
                  TPB
                </div>
                <div className="text-white text-sm p-1 px-4 rounded-xl bg-gray-800">
                  TPB
                </div>
                <div className="text-white text-sm p-1 px-4 rounded-xl bg-gray-800">
                  TPB
                </div>
              </div>

              <div className=" rounded-[30px] overflow-y-scroll scrollbar-hidden">
                {loading ? (
                  <div></div>
                ) : error ? null : (
                  <div className="relative flex overflow-y-scroll z-10 rounded-[30px] scrollbar-hidden gap-3 w-full h-full">
                    <div className="flex-1 flex w-full max-w-[1700px] h-full rounded-[30px]"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
