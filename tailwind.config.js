/** @type {import('tailwindcss').Config} */
module.exports = {
  // Applies CSS styles to the app directory
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    // Customizing the default theme
    extend: {
      colors: {
        primary: '#F5F5F5',
        secondary: '#B3B3B3',
        accent: '#AF52DE',
        background: '#121212',
        light: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D5D5D5',
        },
        dark: {
          100: '#121212',
          200: '#222222',
          300: '#2C2C2C',
        }
      }
    },
  },
  plugins: [],
}