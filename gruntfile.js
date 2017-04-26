module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      typeinslips: {
        files: {
          'build/typeinslips.min.js': ['src/typeinslips.js']
        }
      }
    },

    watch:{
      scripts: {
        files:['src/demo.html', 'src/demo.css'],
        tasks:['postcss:dist','uncss','uglify:tdr','cssmin','unclassify'],
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Defaults
  // grunt.registerTask('default', ['postcss:dist','uncss:dist']);
  grunt.registerTask('default', ['uglify:typeinslips']);

};
