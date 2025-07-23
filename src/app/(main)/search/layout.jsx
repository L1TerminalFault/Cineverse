import { Suspense } from "react";

export const metadata = {
  title: "Search",
};

export default function ({ children }) {
  return (
    <div className="min-h-screen bg-[#020409] w-full">
      <Suspense fallback={<div></div>}>{children}</Suspense>
    </div>
  );
}
