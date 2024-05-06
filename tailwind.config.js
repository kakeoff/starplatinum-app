/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [require('tailwind-animatecss')],
  theme: {
    fontFamily: {
      heading: ['Montserrat', 'sans-serif'],
      sans: ['Mandali', 'sans-serif'],
      mono: ['Ubuntu Mono', 'monospace']
    },
    extend: {}
  }
}
