const path = require('path');

module.exports = {
  root: path.resolve(__dirname),
  app: path.resolve(__dirname, 'app'),
  public: path.resolve(__dirname, 'public'),
  test: path.resolve(__dirname, 'app', '__tests__'),
  template: path.resolve(__dirname, 'templates'),
  nodemodules: path.resolve(__dirname, 'node_modules'),
};
