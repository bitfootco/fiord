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
        slate: {
          50: '#F7F8FA',
          100: '#EEF0F4',
          200: '#D2D7E2',
          300: '#A3ADBE',
          400: '#7B8598',
          500: '#5B6578',
          600: '#3A4459',
          700: '#2A3550',
          800: '#1A2235',
          900: '#131927',
          950: '#0A0F1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
