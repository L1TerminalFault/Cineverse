import { Suspense } from "react";

export const metadata = {
  title: "Home",
};

export default function ({ children }) {
  return (
    <Suspense fallback={<div></div>}>
      <div className="w-full h-full">{children}</div>
    </Suspense>
  );
}
