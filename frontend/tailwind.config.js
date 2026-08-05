/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'egyptian-gold': '#C5A100', // ذهبي
        'pharaoh-dark': '#0E0D0A',  // أسود غامق
        'papyrus': '#E6D8AD',       // بيج فاتح
        'sand': '#CBB994',          // رملي
      },
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


