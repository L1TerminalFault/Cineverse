"use client"

import { useEffect } from "react"

import TopBar from "@/app/components/TopBar"
import { TrayNowPlaying, TrayUpcoming } from "@/app/components/MovieTray"

export default function() {
  return (
    <div>
      <TopBar/>

      <div className="p-3 pt-16">
        
        <TrayUpcoming />
        <TrayNowPlaying />

      </div>
    </div>
  )
}