/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        ".scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
