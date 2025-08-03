export default function () {
  return (
    <div
      onClick={() => setTrailerBox(false)}
      className={`transition-all fixed z-40 top-0 left-0 h-screen w-screen`}
    >
      <div className="flex flex-col z-50 items-center justify-center w-full h-full backdrop-blur-md bg-black/50">
        <div className="flex h-full w-full gap-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center max-h-[calc(100vh*8/9)] max-w-[1700px] w-full p-6 lg:p-16 pt-0">
            {/*<div className="flex w-full justify-between p-4 pt-0">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setExpand((prev) => !prev);
                }}
                className="p-2 rounded-full hover:bg-gray-400/30 transition-all cursor-pointer"
              >
                {expand ? <HiMiniBars3 size={30} /> : <HiMiniBars2 size={30} />}
              </div>

              <BsChevronLeft size={30} />
            </div> */}

            {true ? (
              <div className="aspect-video appear flex transition-all items-center overflow-hidden justify-center rounded-[30px] w-full h-full bg-black">
                <div className="bg-gray-100 rounded-full p-1 bg-gradient-to-br from-white to-white via-gray-900 animate-spin">
                  <div className="bg-black rounded-full p-5"></div>
                </div>
              </div>
            ) : false ? null : (
              <div className="relative flex overflow-y-scroll z-10 rounded-[30px] scrollbar-hidden gap-3 w-full h-full">
                <div className="flex-1 flex w-full max-w-[1700px] max-h-[calc(100vh*8/9)] h-full rounded-[30px]">
                  <iframe
                    className="bg-black flex-1 h-full max-h-[calc(100vh*8/9)] w-full aspect-video rounded-[30px]"
                    src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=0&mute=0&controls=1&modestbranding=1&rel=0&showinfo=1`}
                    title={selectedTrailer.name}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
