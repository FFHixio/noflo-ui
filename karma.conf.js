const externals = require('./externals.conf.js');
const webpackConfig = require('./webpack.config.js');

process.env.CHROME_BIN = require('puppeteer').executablePath(); // eslint-disable-line

module.exports = function (config) {
  const files = [
    'browser/*.min.js',
    'spec/index.js',
    {
      pattern: 'spec/mockruntime.html',
      included: false,
      served: true,
      watched: true,
    },
    {
      pattern: 'browser/index.html',
      included: false,
      served: true,
      watched: true,
    },
  ];
  const serveExternals = externals.slice(0);
  serveExternals.push('browser/css/*.css');
  serveExternals.forEach((pattern) => {
    if (files.indexOf(pattern) !== -1) {
      return;
    }
    files.push({
      pattern,
      included: false,
      served: true,
      watched: false,
    });
  });

  const configuration = {
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files,
    exclude: [],
    preprocessors: {
      'spec/index.js': ['webpack'],
    },
    webpack: {
      module: {
        rules: webpackConfig.module.rules,
      },
      node: webpackConfig.node,
      mode: 'development',
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    singleRun: true,
    concurrency: Infinity,
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['ChromeHeadlessNoSandbox'];
  }

  config.set(configuration);
};
