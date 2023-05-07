/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./src/**/*.{html,js}"],   
  theme: {
    extend: {
      fontSize: {
        11: "11px",
        13: "13px",
        14: "14px",
        16: "16px",
        18: "18px",
        21: "21px",
        27: "27px",
        48: "48px",
      },
      colors: {
        primary: "#5EC2A8",
        secondary: "#444444",
        tertiary: "#6F6F6F",
        quaternary: "#777777",
        danger: "#d80027",
        star: "#FFC600",
        buttonHover: "#27AAE1",
        primaryBackground: "#aee0d3",
        secondaryBackground: "#EEEEEE",
        tertiaryBackground: "##F8F8F8",
        headerText: "#24314D",
        buttonBorder: "#BDBDBD",
        headerTextOpacity5: "#24314D0D",
        blackOpacity5: "#0000000D",
        quaternaryOpacity5: "##7777770D",
        blackOpacity10: "#0000001A",
        primaryOpacity10: "#55B99F1A",
        secondaryOpacity10: "#4444441A",
        quaternaryOpacity10: "##7777771A",
        whiteOpacity10: "#FFFFFF1A",
        whiteOpacity25: "#FFFFFF40",
        details: "#FFFFFF80",
      },
      fontFamily: {
        regular: ["regular", "sans-serif"],
        light: ["light", "sans-serif"],
        bold: ["bold", "sans-serif"],
        semibold: ["semibold", "sans-serif"],
        italic: ["italic", "sans-serif"],
      },
    },
  },
  plugins: [],
}

