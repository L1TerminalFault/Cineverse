import { Suspense } from "react";

export const metadata = {
  title: "Search",
};

export default function ({ children }) {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div></div>}>{children}</Suspense>
    </div>
  );
}
