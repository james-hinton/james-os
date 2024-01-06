module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "sc-gray": "#333333",
        "sc-background": "#F2F2F2"
      }
    },
  },
  plugins: [],
  important: "#soundcloud",
  prefix: "sc-",
  variants: {},
  corePlugins: {
    preflight: false,
  },
};
