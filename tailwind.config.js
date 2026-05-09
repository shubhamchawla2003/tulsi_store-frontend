export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tulsi: {
          50: '#f0f9f1', 100: '#dcf0de', 200: '#bce0c0',
          300: '#8ec896', 400: '#5eaa68', 500: '#3d8c47',
          600: '#2d7037', 700: '#25592e', 800: '#1f4727', 900: '#1a3b21',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
