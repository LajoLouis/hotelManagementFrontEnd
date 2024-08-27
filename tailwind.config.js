/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '200px',
      },
    },
    fontFamily:{
      'Gupter': ['Gupter', 'serif']
    }
  },
  plugins: [],
}

