/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#184269",
          hover: "#102e4a",
          secondary: "#f3f4f6",
          dark: "#111827",
          muted: "#4b5563",
          sale: "#b42318",
        },
      },
      height: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
