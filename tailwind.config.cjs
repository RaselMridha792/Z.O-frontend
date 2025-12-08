/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed',
        accent: '#06b6d4'
      },
      backgroundImage: {
        'hero-grad': 'linear-gradient(135deg,#0f172a 0%, #0b1220 50%, #07122a 100%)',
      },
    },
  },
  plugins: [],
}
