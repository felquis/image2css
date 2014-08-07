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
            'script.js']
  }

  grunt.initConfig(taskConfigs);

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('deploy', ['gh-pages']);

};
