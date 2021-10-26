require('dotenv').config()

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './**/*.liquid',
      './src/**/*.tsx',
      './src/**/*.ts',
      './src/**/*.jsx', 
      './src/**/*.js'
     ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
