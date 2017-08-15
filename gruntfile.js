module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      galley: {
        files: {
          'build/galley.min.js': ['src/galley.js']
        }
      }
    },

    watch:{
      scripts: {
        files:['src/demo.html', 'src/demo.css'],
        tasks:['uglify:galley'],
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Defaults
  // grunt.registerTask('default', ['postcss:dist','uncss:dist']);
  grunt.registerTask('default', ['uglify:galley']);

};
