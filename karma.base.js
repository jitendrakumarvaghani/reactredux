const webpackBaseConfig = require('./webpack.base')({ hot: false });
const webpackDevConfig = require('./webpack.dev');
const karmaPhantomjsLauncher = require('karma-phantomjs-launcher');
const karmaMocha = require('karma-mocha');
const karmaSourcemapLoader = require('karma-sourcemap-loader');
const karmaMochaReporter = require('karma-mocha-reporter');
const karmaWebpack = require('karma-webpack');
const karmaSpecReporter = require('karma-spec-reporter');

module.exports = () => ({
  files: [
    'node_modules/phantomjs-polyfill/bind-polyfill.js',
    'node_modules/promise-polyfill/promise.js',
    'app/__tests__/loader.js',
  ],
  preprocessors: {
    'app/__tests__/loader.js': ['webpack', 'sourcemap'],
  },
  frameworks: ['mocha'],
  reporters: [],
  webpack: {
    module: webpackDevConfig.module,
    resolve: webpackBaseConfig.resolve,
    devtool: 'inline-source-map',
    externals: {
      fs: '{}',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
      cheerio: 'window',
    },
  },
  webpackMiddleware: {
    stats: {
      colors: true,
      exclude: [/node_modules/],
    },
  },
  plugins: [
    karmaPhantomjsLauncher,
    karmaMocha,
    karmaSourcemapLoader,
    karmaMochaReporter,
    karmaWebpack,
    karmaSpecReporter,
  ],
  browsers: ['PhantomJS'],
  port: 9876,
  colors: true,
  autoWatch: true,
  captureTimeout: 60000,
  singleRun: false,
});
