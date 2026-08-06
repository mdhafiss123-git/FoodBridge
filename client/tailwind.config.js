/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#173226',
        forest: '#153F2D',
        leaf: '#153F2D',
        ivory: '#FAFAF7',
        sage: '#E6F3EA',
        mint: '#E6F3EA',
        terracotta: '#E67E5F',
        coral: '#E67E5F',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px rgba(21,63,45,.08)',
        card: '0 1px 2px rgba(21,63,45,.06), 0 8px 20px -6px rgba(21,63,45,.10)',
      },
    },
  },
  plugins: [],
};