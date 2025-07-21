import { Suspense } from "react";

export const metadata = {
  title: "Explore",
};

export default function ({ children }) {
  return (
    <Suspense fallback={<div></div>}>
      <div className="min-h-screen bg-[#020409] w-full">{children}</div>;
    </Suspense>
  );
}
