/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/*.ejs', './public/*.{html, ejs, js}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
