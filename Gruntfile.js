module.exports = function(grunt) {

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
  }

  taskConfigs.mocha = {
    image2css: {
      src: ['tests/index.html'],
      options: {
        run: true,
      }
    },
  },

  grunt.initConfig(taskConfigs);

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('deploy', ['mocha:image2css', 'gh-pages']);

};
