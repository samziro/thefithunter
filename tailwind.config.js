/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
     extend: {
      colors: {
        bg: "#192028",
        lightBg: "#2e3840",
        standardCard: "#1f2a33",
        premiumCard: "#ae782f",
        button: "#ae782f",
        buttonHover: "#d47b15",
        textMain: "#d0d2d6ff",
        textSecondary: "#d9dde0ff",
      },
    },
  },
  plugins: [],
}

