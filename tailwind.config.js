/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "hsl(0deg 0% 8%)",
        netflixRed: "hsl(357deg 92.44% 46.67%)",
      },
      animation:{
        rtl: 'rtl 1s linear' 

      },
      keyframes:{
        rtl:{
          "0%":{
            marginRight: "-100%"
          },
          "100%":{
            marginRight: "0%"
          }
        }
      }
    },
  },
  plugins: [],
};
