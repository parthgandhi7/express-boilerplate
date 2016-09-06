module.exports = function(grunt) {

  grunt.initConfig({
    jscs: {
      src: ['gruntfile.js', 'app.js', './api/**/*.js', './config/**/*.js'],
      options: {
        config: '.jscrc',
        fix: false // Autofix code style violations when possible.
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        undef: true,
        unused: true,
        node: true
      },
      all: ['gruntfile.js', 'app.js', './api/**/*.js', './config/**/*.js']
    }
  });

  // Load the plugin that provides the "jshintify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');

  // Default task(s).
  grunt.registerTask('codeLint', ['jshint']);
  grunt.registerTask('styleLint', ['jscs']);
};
