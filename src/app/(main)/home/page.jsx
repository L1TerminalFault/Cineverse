"use client"

import { useEffect } from "react"

import TopBar from "@/app/components/TopBar"
import { TrayUpcoming } from "@/app/components/MovieTray"

export default function() {
  return (
    <div>
      <TopBar/>

      <div className="p-3 pt-16">
        
        <TrayUpcoming />

      </div>
    </div>
  )
}