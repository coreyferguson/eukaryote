
/**
 * https://github.com/gotwarlost/istanbul/issues/212
 * 
 * This configuration is the same as `karma.conf.js` except without istanbul loader. The istanbul loader
 * was destroying the source maps, making errors reported during testing hard to read. Unfortunately,
 * the istanbul loader was necessary to generate code coverage reports. Continuous testing run with this 
 * configuration while normal grunt build will be run with `karma.conf.js`.
 */

module.exports = function(config) {
  config.set({
    basePath: '..',
    frameworks: ['jasmine'],
    files: [
      'test/spec/**/*.js'
    ],
    exclude: [],
    preprocessors: {
      'test/spec/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: { devtool: 'inline-source-map' },
    webpackMiddleware: { noInfo: true },
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
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
