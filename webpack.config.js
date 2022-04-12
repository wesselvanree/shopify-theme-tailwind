require('dotenv').config()
const path = require('path')
const glob = require('glob')

/**
 * Get files in the entries folder and generate the target filename in the shopify/assets folder.
 *
 * @param {string} sep folder name separator
 * @returns entries to bundle to the assets folder
 */
const getEntries = (sep = '_') => {
  const removeExtension = filename => filename.replace(/.[^/.]+$/, '')
  const entries = {}

  glob.sync('./src/entries/**/*.{js,jsx,ts,tsx}').forEach(filePath => {
    let name = removeExtension(filePath)
      .replace('./src/entries/', '')
      .split('/')
      .join(sep)

    const nestedIndexEnd = `${sep}index`

    if (name.endsWith(nestedIndexEnd)) {
      // use parent directory name if filename is index.{js,jsx,ts,tsx} in child directory
      name = name.slice(0, -nestedIndexEnd.length)
    }

    entries[name] = filePath
  })

  return entries
}

const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'
console.log('Webpack running in ' + mode + ' mode')

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: mode,
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
