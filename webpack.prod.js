const path = require('path');
const paths = require('./webpack.paths');
const baseConfig = require('./webpack.base')({ hot: false });
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  ...baseConfig,
  module: {
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!autoprefixer?browsers=last 2 versions!postcss-loader!sass-loader'),
      },
    ],
  },
  debug: false,
  output: {
    path: paths.public,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[name].chunk.js',
    publicPath: '/',
  },
  plugins: [
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.template, 'index.template.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
