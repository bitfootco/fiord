/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        fiord: {
          navy: '#0F1C2E',
          slate: '#4A7FA5',
          bg: '#F8F9FB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
