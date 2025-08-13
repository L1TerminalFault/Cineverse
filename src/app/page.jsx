"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleRight } from "react-icons/fa6";

import TopBar from "@/app/components/TopBar";
import OnboaringBackground from "@/app/components/OnboardingBackground";
import { imagePath } from "@/lib/utils";

const imageList = [
  "/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg",
  "/22AouvwlhlXbe3nrFcjzL24bvWH.jpg",
  "/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg",
  "/6WxhEvFsauuACfv8HyoVX6mZKFj.jpg",
  "/26oSPnq0ct59l07QOXZKyzsiRtN.jpg",
  "/9wV65OmsjLAqBfDnYTkMPutXH8j.jpg",
  // "/3mExdWLSxAiUCb4NMcYmxSkO7n4.jpg",
  // "/AEgggzRr1vZCLY86MAp93li43z.jpg",
  // "/aFRDH3P7TX61FVGpaLhKr6QiOC1.jpg",
];

export default function () {
  const title = "Enjoy your favorite movies and shows!";
  const description =
    "With Cineverse, you can get info, watch trailer, download and stream torrents of your favorite movies and tv shows,.";

  // NOTE: Remove this line
  // return redirect("/home");
  // useEffect(() => {
  //   const notFirstTime = localStorage.getItem("_cineverse_not_first_time_");
  //   if (notFirstTime === "true") return redirect("/home");
  //   localStorage.setItem("_cineverse_not_first_time_", "true");
  // }, []);

  return (
    <div className="w-full h-screen ">
      {" "}
      {/**bg-[#020409]*/}
      <TopBar />
      <div className="h-full w-full relative flex z-30 bg-transparent items-center justify-center ">
        <div className="w-full h-full absolute top-0 left-0 -z-10">
          <OnboaringBackground speed={0.2} />
        </div>

        <div className="2xl:w-2/3 h-full flex p-6 xl:pb-32 pt-14">
          <div className="h-full w-1/2 flex flex-col justify-between">
            <div></div>

            <div className="flex-col flex gap-5">
              <div className="xl:text-7xl/[85px] text-3xl font-bold max-w-[650px] ">
                {title}
              </div>

              <div className="text-gray-300 max-w-96">{description}</div>

              <div className="max-w-96 flex gap-3 md:text-base text-sm">
                <div className="bg-white/10 flex gap-1 items-center p-3 px-10 md:px-14 rounded-full hover:bg-white/15">
                  <div>Sign In</div>
                </div>

                <Link
                  href={"/home"}
                  className="flex items-center gap-1 p-3 px-10 md:px-14 bg-white rounded-full text-black hover:bg-white/90"
                >
                  <FaAngleRight color="black" />
                  <div>Explore</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full flex justify-center items-end">
            <div className="relative xl:w-2/3 w-1/2 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00000000_0%,_#020409bb_45%,_#000000cc_50%,_#000000_70%,_#000000_100%)] rounded-3xl"></div>
              <div className="grid grid-cols-3 gap-2 xl:gap-4 grid-rows-2">
                {imageList.map((image) => (
                  <Image
                    key={image}
                    src={imagePath(image)}
                    width={140}
                    height={137}
                    alt=""
                    className="rounded-xl xl:rounded-3xl"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
