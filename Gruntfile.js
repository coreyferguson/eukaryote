
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      grunt: 'Gruntfile.js',
      app: 'src/**/*.js',
      test: 'test/**/*.js'
    },

    clean: {
      dist: {
        src: 'dist/**/*.js'
      }
    },

    karma: {
      continuous: {
        configFile: 'test/karma.conf.js'
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
    },

    cat: {
      coverageDetail: {
        file: 'coverage/coverage-detail.txt'
      },
      coverageSummary: {
        file: 'coverage/coverage-summary.txt'
      }
    },

    webpack: {
      amd: {
        entry: "./src/eukaryote.js",
        output: {
          filename: "./dist/eukaryote-amd.js",
          libraryTarget: 'amd'
        }
      },
      this: {
        entry: "./src/eukaryote.js",
        output: {
          filename: "./dist/eukaryote-this.js",
          library: 'Eukaryote',
          libraryTarget: 'this'
        }
      }
    },

    bump: {
      options: {
        push: false
      }
    },

    uglify: {
      amd: {
        src: 'dist/eukaryote-amd.js',
        dest: 'dist/eukaryote-amd.min.js'
      },
      this: {
        src: 'dist/eukaryote-this.js',
        dest: 'dist/eukaryote-this.min.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-cat');

  grunt.registerTask('default', ['build', 'jshint', 'test:single']);
  grunt.registerTask('build', ['clean', 'webpack', 'uglify']);

  grunt.registerTask('test:single', ['test:virtual']);
  grunt.registerTask('test:continuous', ['karma:continuous']);
  grunt.registerTask('test:virtual', ['karma:singleVirtual', 'cat:coverageSummary']);
  grunt.registerTask('test:real', ['karma:singleReal', 'cat:coverageSummary']);

};