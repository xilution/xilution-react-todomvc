/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './src/backend/index.js'],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist/backend'),
  },
  target: 'node',
};
/* eslint-enable */
