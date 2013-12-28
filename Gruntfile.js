module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: ['js/lib/*.js','js/global.js'], //input
        dest: 'js/build/global.min.js' //output
      }
    },
    sass: {                              // Task
    	dist: {                            // Target
			options: {                       // Target options
				style: 'compressed'
			},
		files: {                         // Dictionary of files
        	'css/main.css': 'scss/main.scss',       // 'destination': 'source'
		}
		}
	},
	
	watch: {
	 options: {
        livereload: true,
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['scss/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
	}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
    
  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass']);
  grunt.registerTask('dev', ['watch']);

};