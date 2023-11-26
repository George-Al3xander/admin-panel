/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#21209C"
      },
      fontFamily: {
        "default": "'Roboto', sans-serif"
      },
      width: {
        "responsive": "min(90%,40rem)"
      }
    },
  },  
  plugins: [],
}

