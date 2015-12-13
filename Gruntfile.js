
module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        'esnext': true
      },
      'Gruntfile.js': 'Gruntfile.js',
      src: 'src/**/*.js',
      test: 'test/**/*.js'
    },

    clean: {
      dist: {
        src: 'dist/**/*.js'
      },
      build: {
        src: 'build/'
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
      "amd-es6": {
        entry: "./src/eukaryote.js",
        output: {
          filename: "./dist/eukaryote-amd-es6.js",
          libraryTarget: 'amd'
        }
      },
      "this-es6": {
        entry: "./src/eukaryote.js",
        output: {
          filename: "./dist/eukaryote-this-es6.js",
          library: 'Eukaryote',
          libraryTarget: 'this'
        }
      },
      "amd-es5": {
        entry: "./build/eukaryote.js",
        output: {
          filename: "./dist/eukaryote-amd-es5.js",
          libraryTarget: 'amd'
        }
      },
      "this-es5": {
        entry: "./build/eukaryote.js",
        output: {
          filename: "./dist/eukaryote-this-es5.js",
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
      "amd-es5.min": {
        src: 'dist/eukaryote-amd-es5.js',
        dest: 'dist/eukaryote-amd-es5.min.js'
      },
      "this-es5.min": {
        src: 'dist/eukaryote-this-es5.js',
        dest: 'dist/eukaryote-this-es5.min.js'
      }
    },

    sizediff: {
      options: {
        target: 'v2'
      },
      dist: 'dist/**/*.js',
      src: 'src/**/*.js'
    },

    babel: {
      options: {
        presets: ['es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*.js',
          dest: 'build/'
        }]
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
  grunt.loadNpmTasks('grunt-sizediff');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['build', 'jshint', 'test:single', 'report']);
  
  grunt.registerTask('build', ['clean:dist', 'babel', 'webpack', 'uglify', 
    // 'clean:build'
    ]);
  grunt.registerTask('report', ['cat:coverageSummary']);
  grunt.registerTask('test:single', ['test:virtual']);
  grunt.registerTask('test:continuous', ['karma:continuous']);
  grunt.registerTask('test:virtual', ['karma:singleVirtual']);
  grunt.registerTask('test:real', ['karma:singleReal']);

};