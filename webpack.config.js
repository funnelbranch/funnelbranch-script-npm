const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageDotJson = require('./package.json');

// https://medium.com/@jdxcode/for-the-love-of-god-dont-use-npmignore-f93c08909d8d
// https://itnext.io/how-to-build-and-publish-npm-packages-with-webpack-dea19bb14627
module.exports = {
  entry: {
    index: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  target: 'es5',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      BUILD_PACKAGE_VERSION: JSON.stringify(packageDotJson.version),
    }),
  ],
};
