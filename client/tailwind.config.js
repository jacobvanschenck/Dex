/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Open Sans', defaultTheme.fontFamily.sans] },
      colors: {
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D2D5DA',
          400: '#9DA3AE',
          500: '#6C727F',
          600: '#4D5562',
          700: '#394150',
          800: '#212936',
          900: '#121826',
          950: '#040711',
        },
        primary: {
          50: '#FEFCEA',
          100: '#FDF9C9',
          200: '#FCF097',
          300: '#F8E164',
          400: '#F3CE49',
          500: '#E2B53E',
          600: '#C18D30',
          700: '#986523',
          800: '#7D501F',
          900: '#6A411C',
          950: '#3D220C',
        },
      },
    },
  },
  plugins: [],
};
