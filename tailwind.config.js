/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#803C9E",
        fairpurple: "#DCCCFF",
        darkgray: "#9E9E9E",
        verydarkgray: "#6F6D6D",
        gray: "#F6F1F6",
        midgray: "#D7D3C8",
        white: "#FCFCFC",
        fragole: "#F24156",
        yellow: "#FCC63D",
        darkyellow: "#8f6c0b",
        lightyellow: "#fcf6de",
        green: "#39731e",
        lightgreen: "#d7f5c9",
      },
      fontFamily: {
        mina: ['Mina-Regular', 'Sans-Serif']
      },
      skew: {
        '45': '45deg',
        '20': '20deg',
      },
    },
  },
  plugins: [],
};
