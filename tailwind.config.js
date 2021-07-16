module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        "96": "24rem",
      },
      colors: {
        memoYellow: {
          "bg-light": "#F6C986",
          bg: "#FFC682",
          "500": "#FFDD78",
        },
      },
      boxShadow: {
        memo: "0px 4px 24px #C87A55",
      },
      backgroundImage: () => ({
        label: "url('~@/./assets/label.svg')",
        toggle: "url('~@/./assets/toggle.svg')",
      }),
    },
    // colors: {
    //   memoYellow:{
    //     'bg-light':'#F6C986'
    //   }
    // }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
