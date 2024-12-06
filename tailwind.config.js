/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : {
          default : '#7772d3',
          secondary : '#ecedf8',
          text : '#25292e',
        }
      }
    },
  },
  plugins: [],
}