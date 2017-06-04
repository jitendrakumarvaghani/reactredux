const path = require('path');
const paths = require('./webpack.paths');

module.exports = ({ hot } = { hot: false }) => ({
  target: 'web',
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(paths.app, 'index'),
    ],
  },
  sassLoader: {
    includePaths: [path.resolve(paths.nodemodules, 'bootstrap', 'scss')],
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        loaders: (hot ? ['react-hot'] : []).concat(['babel-loader?plugins=transform-runtime']),
        exclude: [/node_modules/],
        include: [
          paths.app,
          paths.test,
        ],
      },
      {
        test: /\.jpg$/,
        loader: 'url',
      },
      {
        test: /\.png$/,
        loader: 'file',
      },
      {
        test: /\.svg$/,
        loader: 'file',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /sinon.*\.js$/,
        loader: 'imports?define=>false,require=>false',
      },
      { test: /\.woff2*(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
    ],
    noParse: [
      /\.min\.js/,
      /node_modules\/sinon\//,
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      app: paths.app,
      sinon: 'sinon/pkg/sinon',
    },
    modulesDirectories: [
      paths.nodemodules,
    ],
  },
});
