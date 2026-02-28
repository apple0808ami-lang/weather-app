/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./page.tsx", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pastel: {
          peach: "#ffe3d8",
          mint: "#d9f7ea",
          sky: "#d8eaff",
          cream: "#fff7de",
          lilac: "#eee3ff",
        },
      },
      boxShadow: {
        float: "0 18px 35px -20px rgba(30, 41, 59, 0.35)",
        insetSoft: "inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      },
      borderRadius: {
        xl2: "1.1rem",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
