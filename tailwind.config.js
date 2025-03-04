module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderRadius: {
        inherit: "inherit",
      },
      boxShadow: {
        sm: " 0px 2px 4px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.08)",
      },
      colors: {
        primary: "#0B72EB",
        onPrimary: "#FFFFFF",
        background: "#000000",
        onBackground: "#525252",
        surface: "#1F1F1F",
        onSurface: "#F5F5F5",
        wrapperCard: "#1F1F1FA3",
      },
      lineHeight: {
        100: "100%",
        130: "130%",
        150: "150%",
      },
      screens: {
        xs: "475px",
        xxl: "1920px",
      },
      width: {
        "product-list": "22rem",
      },
    },
  },
  plugins: [],
  ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
};
