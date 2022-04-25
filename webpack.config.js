require('dotenv').config()
const path = require('path')
const glob = require('glob')
const logger = require('./helpers/logger')

/**
 * Get files in the entries folder and generate the target bundle filename. If an index.{js,jsx,ts,tsx} file
 * is located in a subfolder of src/entries, the parent folder path will be used for the target bundle filename.
 *
 * @param {string} sep folder name separator
 * @returns entries to bundle to the assets folder
 */
const getEntries = (sep = '_') => {
  const removeExtension = filename => filename.replace(/.[^/.]+$/, '')
  const nestedIndexEnd = `${sep}index`

  return glob
    .sync('./src/entries/**/*.{js,jsx,ts,tsx}')
    .reduce((prev, file) => {
      let name = removeExtension(file)
        .replace('./src/entries/', '')
        .split('/')
        .join(sep)

      if (name.endsWith(nestedIndexEnd)) {
        // use parent directory name if filename is index.{js,jsx,ts,tsx} in child directory
        name = name.slice(0, -nestedIndexEnd.length)
      }

      return {...prev, [name]: file}
    }, {})
}

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'
logger.info(`Webpack running in ${mode} mode`)

/** @type {import('webpack').Configuration} */
module.exports = {
  mode,
  entry: getEntries(),
  output: {
    path: path.resolve(__dirname, 'shopify', 'assets'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
}
