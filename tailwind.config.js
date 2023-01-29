module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-page":
          "url('/src/assets/login_bg.PNG')",
        "logged-in":
          "url('/src/assets/homescreen_bg.PNG')",
      },
    },
  },
  plugins: [],
};
