const path = require('path');
const glob = require('glob');

const getEntries = () => {
  const entries = {};
  glob.sync('./src/entries/**/*.js').forEach(filePath => {
    const filename = filePath.replace(/.\/src/).replace(/^.*[\\\/]/, '');
    let targetFile = filename;

    // use parent directory name if filename is index.js inside child directory
    if (filename === 'index.js' && !filePath.includes('entries/index.js')) {
      const parentFolder = filePath
        .split('/index.js')[0]
        .replace(/(.+\/)+/, '');
      targetFile = !!parentFolder ? `${parentFolder}.js` : filename;
    }
    targetFile = targetFile.replace('.js', '.bundle.js');
    entries[targetFile] = filePath;
  });
  return entries;
};

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: getEntries(),
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {targets: 'defaults'}],
            '@babel/react',
          ],
          sourceType: 'unambiguous',
        },
      },
    ],
  },
};
