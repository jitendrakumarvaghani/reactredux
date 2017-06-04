const path = require('path');
const karamBaseConfig = require('./karma.base')();
const istanbulInstrumenterLoader = require('istanbul-instrumenter-loader');
const karmaCoverage = require('karma-coverage');
const karmaSpecReporter = require('karma-spec-reporter');

module.exports = (config) => {
  karamBaseConfig.reporters = ['mocha', 'coverage'];
  karamBaseConfig.coverageReporter = {
    dir: 'coverage',
    reporters: [
      { type: 'html', subdir: '.' },
      { type: 'text' },
      { type: 'text-summary' },
    ],
  };
  karamBaseConfig.instrument = {
    ignore: [
      /node_modules.*/,
      /.*(test|spec).*/,
    ],
  };
  karamBaseConfig.webpack.module.preLoaders = [
    {
      test: /^(?!.*spec.*).*\.js(x)?$/,
      loader: 'babel-istanbul',
      include: [
        path.resolve(__dirname, 'app', '__tests__'),
        path.resolve(__dirname, 'app'),
      ],
      query: {
        cacheDirectory: false,
      },
    },
  ];
  karamBaseConfig.plugins.push(istanbulInstrumenterLoader);
  karamBaseConfig.plugins.push(karmaCoverage);
  karamBaseConfig.plugins.push(karmaSpecReporter);
  karamBaseConfig.logLevel = config.LOG_INFO;
  config.set(karamBaseConfig);
};
