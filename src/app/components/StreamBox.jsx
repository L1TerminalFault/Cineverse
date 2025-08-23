"use client";

import { useEffect, useRef } from "react";

export default function WebtorPlayer({ magnetUri, poster, subtitles }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    window.webtor = window.webtor || [];
    window.webtor.push({
      id: container.current.id,
      magnet: magnetUri,
      poster: poster || "",
      subtitles: subtitles || [],
      lang: "en",
      controls: true,
      features: {
        subtitles: true,
        playpause: true,
        timeline: true,
        volume: true,
        fullscreen: true,
        chromecast: true,
        embed: false,
      },
    });
  }, [magnetUri, poster, subtitles]);

  return (
    <div
      id="webtor-player"
      ref={container}
      className="w-full overflow-hidden h-full bg-black flex items-center justify-center"
    />
  );
}
