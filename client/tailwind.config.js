module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      letterSpacing: {
        smExtreme: "40px",
        midExtreme: "25px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
