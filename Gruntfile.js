
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    paths: {
      literalJS: "literal-numbers.js",
      literalJSMin: "literal-numbers.min.js",
    },

    jshint: {
      all: {
        files: {
          src: ["<%= paths.literalJS %>"]
        },
        options: {
          bitwise: true
          ,curly: true
          ,eqeqeq: true
          ,immed: true
          ,latedef: true
          ,newcap: true
          ,noempty: true
          ,nonew: true
          ,undef: true
          ,unused: true
          ,laxcomma: true
          ,quotmark: false
          ,loopfunc: false
          ,forin: false

          ,globals: {
            window: true
            ,document: true
            ,console: true
            ,module: true
            ,require: true
            ,exports: true
            ,define: true
            ,literalNumbers: true
          }
        }

      }
    },

    uglify: {
      all: {
        files: {
          '<%= paths.literalJSMin %>': [ '<%= paths.literalJS %>' ]
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  var build = [
    "jshint:all", 
    "uglify"
  ];

  grunt.registerTask("default", build);
};
