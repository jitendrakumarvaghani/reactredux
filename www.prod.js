const paths = require('./webpack.paths');
const express = require('express');
const webpack = require('webpack');

const app = express();
app.use(express.static(paths.public));
const port = (process.env.PORT || 4000);
console.info('building...');
const webpackProdConfig = require('./webpack.prod.js');

webpack(webpackProdConfig).run((error) => {
  console.info('build done');
  if (error) {
    console.error('buid->', error);
  }
  app.listen(port, '0.0.0.0', () => {
    console.info(`Listening at 0.0.0.0: ${port}`);
  });
});
