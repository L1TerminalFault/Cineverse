"use client";

import { Suspense } from "react";
import ExplorePage from "./explorePage";

export default function () {
  return (
    <Suspense fallback={<div></div>}>
      <ExplorePage />
    </Suspense>
  );
}
