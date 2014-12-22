module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  var taskConfigs = {};

  taskConfigs.pkg = grunt.file.readJSON('package.json');

  taskConfigs['gh-pages'] = {
      options: {
        base: './',
        message: ':beers: cheers! :dancer:'
      },
      src: ['index.html',
            'image2css.js',
            'style.css',
            'script.js',
            'bower_components/**',
            'tests/**',
            'css/**',
            'scripts/**',
            'lib/**']
  };

  taskConfigs.mocha = {
    image2css: {
      src: ['tests/index.html'],
      options: {
        run: true,
      }
    },
  };

  taskConfigs.jshint = {
    options: {
      reporter: require('jshint-stylish')
    },
    browser: {
      src: ['lib/*.js', 'scripts/*.js']
    },
    tests: {
      options: {
        globals: {
          it: true,
          describe: true,
          before: true
        }
      },
      src: ['tests/*.js']
    },
    gruntfile: {
      src: ['Gruntfile.js']
    }
  };

  grunt.initConfig(taskConfigs);

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('deploy', ['jshint', 'mocha:image2css', 'gh-pages']);
  grunt.registerTask('test', ['jshint', 'mocha:image2css']);

};
