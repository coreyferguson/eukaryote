module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		nodeunit: [ 'test/*.js' ],
		jshint: [ 'Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'examples/**/*.js' ]
	});

	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', ['jshint', 'nodeunit']);

};
