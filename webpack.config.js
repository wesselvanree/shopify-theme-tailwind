require('dotenv').config()
const path = require('path')
const glob = require('glob')

const removeExtension = file => {
  const split = file.split('.')
  split.pop()
  return split.join('.')
}

const getEntries = () => {
  const entries = {}
  glob.sync('./src/entries/**/*.{js,jsx,ts,tsx}').forEach(filePath => {
    const filename = filePath.replace(/.\/src/).replace(/^.*[\\\/]/, '')
    const targetPath = removeExtension(filePath).replace('./src/entries/', '')
    let targetFile = removeExtension(filename)

    // use parent directory name if filename is index.{js,jsx,ts,tsx} inside child directory
    if (
      (targetFile == 'index' || targetFile.endsWith('/index')) &&
      targetPath != 'index'
    ) {
      const parentFolder = targetPath.split('/index')[0].replace(/(.+\/)+/, '')
      targetFile = !!parentFolder ? parentFolder : filename
    }
    targetFile = targetFile + '.bundle.js'
    entries[targetFile] = filePath
  })
  return entries
}

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: getEntries(),
  output: {
    path: path.resolve(__dirname, 'shopify/assets'),
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: 'defaults' }],
            '@babel/typescript',
            '@babel/react',
          ],
          sourceType: 'unambiguous',
        },
      },
    ],
  },
}
