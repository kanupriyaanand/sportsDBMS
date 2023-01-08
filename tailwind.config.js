module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-page":
          "url('https://images.pexels.com/photos/89699/pexels-photo-89699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        "logged-in":
          "url('https://images.pexels.com/photos/623919/pexels-photo-623919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      },
    },
  },
  plugins: [],
};
