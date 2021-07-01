module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./**/*.liquid'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
