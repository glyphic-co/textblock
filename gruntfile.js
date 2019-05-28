module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      textblock: {
        files: {
          'textblock.min.js': ['src/textblock.js']
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/demo.html', 'src/demo.css', 'src/textblock.js'],
        tasks: ['uglify:textblock']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify:textblock']);
};
