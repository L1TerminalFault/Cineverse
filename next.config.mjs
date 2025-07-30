/** @type {import('next').NextConfig} */
const nextConfig = {
  //images: {
  //  domains: ['image.tmdb.org']
  //},

  // For all domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
