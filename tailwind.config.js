module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "1/10-screen": "10vh",
      },
      textColor: {
        "album-title": "#222",
      },
      backgroundColor: {
        "album-container": "#07A081",
        "album-count": "#DADADA",
      },
      animation: {
        "ablum-transform": "transform 0.9s",
      },
      borderColor: {
        "navbar-color": "#DADADA",
      },
      borderRadius: {
        "1/2": "50%",
      },
      boxShadow: {
        "album-hover": "1px 1px 2px 2px #DADADA",
      },
      inset: {
        "13/20": "65%",
        "17/20": "85%",
        "19/20": "95%",
        "7/10": "70%",
        "9/10": "90%",
        "4/5": "80%",
      },
      fontFamily: {
        "album-title": ["Roboto", "sans-serif"],
      },
      zIndex: {
        1: 1,
      },
      screens: {
        xs: "365px",
        ls: "553px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
