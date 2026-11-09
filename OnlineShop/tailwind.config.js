/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1f4e79",
          hover: "#163857",
          secondary: "#f3f4f6",
          dark: "#1f2937",
          muted: "#6b7280",
          sale: "#ef4444",
        },
      },
      height: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
