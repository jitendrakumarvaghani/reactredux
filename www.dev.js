const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.dev');

const compiler = webpack(devConfig);
const server = new webpackDevServer(compiler, {
  open: true,
  hot: true,
  host: '0.0.0.0',
  historyApiFallback: true,
  stats: {
    colors: true,
    exclude: [/node_modules/],
  },
});

server.listen(4000, '0.0.0.0', () => {
  console.info('web listening at 0.0.0.0:4000');
});
