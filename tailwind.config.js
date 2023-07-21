/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('Components/Assets/map.jpeg')",
      }
    },
  },
  plugins: [require("daisyui")],
}
