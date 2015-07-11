module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: [ 'dist' ],
		nodeunit: [ 'test/*.js' ],
		uglify: {
			dist: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-nodeunit')
	grunt.loadNpmTasks('grunt-contrib-clean')

	grunt.registerTask('default', ['clean', 'nodeunit', 'uglify'])

}
