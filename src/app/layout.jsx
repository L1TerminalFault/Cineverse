import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Cineverse",
    template: "%s | Cineverse",
  },
  description: "",
};

export default function ({ children }) {
  return (
    <html lang="en">
      <body
        className={`
${/**${geistSans.variable} ${geistMono.variable} */ ""}
${montserrat.className} antialiased text-white`}
      >
        {children}
      </body>
    </html>
  );
}
