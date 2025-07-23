module.exports = {
  theme: {
    extend: {
      boxShadow: {
        all: "0 0 20px 5px rgb(0, 0, 0)",
      },
      animationDelay: {
        400: "400ms",
        600: "600ms",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "translateY(8px)" },
          "50%": { transform: "translateY(0px)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwindcss-animate")],
};
