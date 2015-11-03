
module.exports = {
  continuous: {
    configFile: 'test/karma-continuous.conf.js'
  },
  singleVirtual: {
    configFile: 'test/karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS']
  },
  singleReal: {
    configFile: 'test/karma.conf.js',
    singleRun: true
  }
};
