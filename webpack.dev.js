const paths = require('./webpack.paths');
const baseConfig = require('./webpack.base')({ hot: true });
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...baseConfig,
  entry: {
    ...baseConfig.entry,
    tests: [
      'babel-polyfill',
      `mocha!/${path.resolve(paths.test, 'loader.js')}`,
      'webpack-dev-server/client?http://0.0.0.0:4000',
      'webpack/hot/only-dev-server',
    ],
  },
  module: {
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'autoprefixer?browsers=last 2 versions', 'sass-loader?sourceMap'],
      },
    ],
  },
  output: {
    path: paths.root,
    filename: '[name].js',
    chunkFilename: '[id].[name].chunk.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  debug: true,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors.js'),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.template, 'index.template.html'),
      filename: 'index.html',
      excludeChunks: ['tests'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.template, 'index.template.html'),
      filename: 'tests.html',
      excludeChunks: ['app'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
  externals: {
    fs: '{}',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    cheerio: 'window',
  },
};
