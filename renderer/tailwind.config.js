/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./renderer/pages/**/*.{js,ts,jsx,tsx}', './renderer/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['QuicksandMedium', 'sans-serif'],
        'quicksand-medium': ['QuicksandMedium', 'sans-serif'],
        'quicksand-bold': ['QuicksandBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
