module.exports = function(grunt){
  //grunt.registerTask('foo', function(){ console.log("foo !"); });
  //grunt.registerTask('bar', function(){ console.log("bar !"); });
  //grunt.registerTask('both', ['foo','bar']);
  
  grunt.initConfig({

    concat: {
      js: {
        src: ['js/*.js'],
        dest: 'build/jslib-min.js',
      }
    },

    uglify: {
      my_target: {
        files: {
          'build/jslib-ugly-min.js' : ['build/jslib-min.js']
        },
      }
    },

    watch: {
      js: {
        files: 'js/**/*.js',
        tasks: ['concat'],
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('work', ['concat','uglify']);
}