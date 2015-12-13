
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
      devtool: 'source-map',
      module: {
        loaders: [{
          loader: 'babel',
          include: [ 'src' ],
          test: /\.js$/,
          query: {
            presets: ['es2015']
          }
        }],
        postLoaders: [{
          test: /src\/.*\.js$/,
          loader: 'istanbul-instrumenter'
        }]
      },
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
