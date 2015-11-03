
module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: require('./config/jshint'),
    clean: require('./config/clean'),
    karma: require('./config/karma'),
    cat: require('./config/cat'),
    webpack: require('./config/webpack'),
    bump: require('./config/bump'),
    uglify: require('./config/uglify'),
    sizediff: require('./config/sizediff'),
    jsdoc: require('./config/jsdoc'),
    jsdoc2md: require('./config/jsdoc2md')
  });

  grunt.registerTask('default', ['clean', 'jshint', 'test:single', 'webpack', 'uglify', 'jsdoc', 'jsdoc2md', 'sizediff', 'cat:coverageSummary']);
  
  grunt.registerTask('test:single', ['test:real']);
  grunt.registerTask('test:continuous', ['karma:continuous']);
  grunt.registerTask('test:virtual', ['karma:singleVirtual']);
  grunt.registerTask('test:real', ['karma:singleReal']);

};