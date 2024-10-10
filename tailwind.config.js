/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/***/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        customGray: "rgb(52, 64, 84)",
        customBlack: "rgb(71, 84, 103)",
        customBlackLight: "rgba(0, 0, 0, 0.28)",
        customColorName: "rgb(16, 24, 40)",
        customText: "rgb(52, 64, 84)",
        customBlue: "rgb(0, 78, 235)",
        customGreen: "rgb(171, 239, 198)",
        customGreenDark: "rgb(7, 148, 85)",
        customRed: "rgb(217, 45, 32)",
        customBgTable: "rgb(249, 250, 251);",
        customBorder: "rgb(234, 236, 240)",
      },
      margin: {
        "52px": "52px",
      },
      gap: {
        "13px": "13px",
      },
    },
  },
};
