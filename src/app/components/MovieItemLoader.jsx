export default function () {
  return (
    <div className="w-max flex flex-col">
      <div className="relative bg-[#2f364b3b] overflow-hidden w-[145px] h-[217.5px] rounded-3xl">
        <div className="swipe p-1 h-full bg-gradient-to-r from-[#0000] via-gray-900 to-[#0000]"></div>
      </div>

      <div className="flex flex-col gap-[6px] p-2 px-3 ">
        <div className="h-4 rounded-full bg-[#2f364b2f] w-3/4"></div>
        <div className="h-3 rounded-full bg-[#2f364b2a] w-1/3"></div>
      </div>
    </div>
  );
}
