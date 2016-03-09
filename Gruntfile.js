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

    //https://github.com/gruntjs/grunt-contrib-copy
    copy: {
      csi:{
        files:[
          { expand:true, flatten:true, src:["build/jslib-ugly-min.js"], dest:"C:/Users/lovehina/dev/darjeeling/citescience_3/src/js/lib/", filter:"isFile"}
        ]
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('csi', ['concat','uglify','copy:csi']);
  grunt.registerTask('work', ['concat','uglify']);
}

//npm install grunt-contrib-copy --save-dev