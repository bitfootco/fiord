/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  darkMode: 'class',
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
        quartz: {
          50: '#F6FAFE',
          100: '#EDF2F7',
          200: '#D9E2EA',
          300: '#B5C3D1',
          400: '#8A9DB0',
          500: '#6B8094',
          600: '#4F6577',
          700: '#3A4D5E',
          800: '#243546',
          900: '#0F1E2E',
          950: '#081019',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
