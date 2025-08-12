import { Suspense } from "react";

export const metadata = {
  title: "Explore",
};

export default function ({ children }) {
  return (
    <div className="h-full w-full">
      <Suspense fallback={<div></div>}>{children}</Suspense>
    </div>
  );
}
