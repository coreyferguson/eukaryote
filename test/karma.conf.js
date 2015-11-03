
var path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    files: [
      'test/spec/**/*.js'
    ],
    exclude: [],
    preprocessors: {
      'test/spec/**/*.js': ['webpack']
    },
    webpack: {
      // Instrument code that isn't test or vendor code.
      module: {
        postLoaders: [{
          test: /\.js$/,
          exclude: /(test|node_modules)\//,
          loader: 'istanbul-instrumenter'
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'coverage-html' },
        { type: 'text', subdir: '.', file: 'coverage-detail.txt' },
        { type: 'text-summary', subdir: '.', file: 'coverage-summary.txt' }
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false,
    concurrency: Infinity
  });
};
