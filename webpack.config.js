const path = require('path')
const getEntries = require('./helpers/get-entries')
const logger = require('./helpers/logger')

require('dotenv').config()

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
