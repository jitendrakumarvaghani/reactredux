const karmaBaseConfig = require('./karma.base')();

module.exports = (config) => {
  karmaBaseConfig.reporters = ['mocha'];
  karmaBaseConfig.logLevel = config.LOG_INFO;
  config.set(karmaBaseConfig);
};
