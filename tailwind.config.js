/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
  content: ['./src/**/*.{html,js,tsx,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['QuicksandMedium', ...defaultTheme.fontFamily.sans],
        'quicksand-medium': ['QuicksandMedium', ...defaultTheme.fontFamily.sans],
        'quicksand-bold': ['QuicksandBold', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
