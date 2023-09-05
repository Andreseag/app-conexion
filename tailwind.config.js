/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  important: true,
  theme: ["dark"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
}

