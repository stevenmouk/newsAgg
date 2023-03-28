/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "430px",
      sm: "625px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {},
  },
  plugins: [],
};
