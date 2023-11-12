/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--mainBg)",
        "green": "#9CBFAE",
        "purple": "#7A6EFF"
      }
    },
  },
  plugins: [],
}

