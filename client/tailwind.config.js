module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      letterSpacing: {
        smExtreme: "40px",
        midExtreme: "25px",
      },
      zIndex: {
        500: "500",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
