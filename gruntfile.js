module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      textblock: {
        files: {
          'textblock.min.js': ['src/textblock.js']
        }
      }
    },

    watch:{
      scripts: {
        files:['src/demo.html', 'src/demo.css', 'src/textblock.js'],
        tasks:['uglify:textblock'],
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Defaults
  // grunt.registerTask('default', ['postcss:dist','uncss:dist']);
  grunt.registerTask('default', ['uglify:textblock']);

};
