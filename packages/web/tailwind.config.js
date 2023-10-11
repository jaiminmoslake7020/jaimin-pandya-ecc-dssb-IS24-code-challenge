module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx,scss,css}', './public/index.html'],
  theme: {
    extend: {},
  },
  variants: {
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwind-scrollbar'),
  ],
}
