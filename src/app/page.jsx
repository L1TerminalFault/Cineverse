"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

import TopBar from "@/app/components/TopBar";

export default function () {
  const title = "Enjoy your favorite movies and shows!";
  const description =
    "With Cineverse, you can get info, watch trailer, download and stream torrents of your favorite movies and tv shows,.";

  // NOTE: Remove this line
  return redirect("/home");
  // useEffect(() => {
  //   const notFirstTime = localStorage.getItem("_cineverse_not_first_time_");
  //   if (notFirstTime === "true") return redirect("/home");
  //   localStorage.setItem("_cineverse_not_first_time_", "true");
  // }, []);

  return (
    <div className="w-full h-screen bg-[#020409]">
      <TopBar />

      <div className="h-full w-full flex items-center justify-center ">
        <div className="2xl:w-2/3 h-full flex flex-col justify-between p-4 pb-32 pt-14">
          <div></div>

          <div className="flex-col flex gap-5">
            <div className="text-7xl/[85px] font-bold max-w-[650px] ">
              {title}
            </div>

            <Link href={"/home"} className="text-gray-900 max-w-96">
              {description}
            </Link>

            <div className="p-8 bg-white/80 rounded-full max-w-96">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
