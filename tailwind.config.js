/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#eff8ff",
          100: "#dcedfd",
          200: "#c1e1fc",
          300: "#96cffa",
          400: "#65b4f5",
          500: "#3a92f0",
          600: "#2b78e5",
          700: "#2363d2",
          800: "#2250ab",
          900: "#214787",
          950: "#192c52",
        },
      },
    },
  },
  plugins: [],
});
