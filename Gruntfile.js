module.exports = function(grunt) {
    // Project configuration.
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: ['src/js/lib/*.js', 'src/js/global.js'],
                dest: 'build/js/global.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: true
                },
                files: {
                    'build/css/main.css': 'src/scss/main.scss',
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9']
            },
            single_file: {
                src: 'build/css/main.css',
                dest: 'build/css/main.prefixed.css'
            },
        },
        cssmin: {
            minify: {
                src: 'build/css/main.prefixed.css',
                dest: 'build/css/main.min.css',
            }
        },
        copy: {
            main: {
                files: [
                     {expand: true, cwd: 'src/font/', src: ['**'], dest: 'build/font/'},
                ],
            },
        },
        connect: {
            server: {
              options: {
                port: 9001,
                base: 'build/',
                livereload: true
              }
            }
        },
        bake: {
            your_target: {
                files: {
                    'build/index.html': 'src/index.html'
                }
            },
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img/'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                    livereload: 35729
                }
            },
            html: {
                files: ['src/*.html', 'src/inc/*.html'],
                tasks: ['bake'],
                options: { livereload: 35729 }
            },
            img: {
                files: ['src/img/*.**'],
                tasks: ['imagemin'],
            },
            css: {
                files: ['src/scss/*.scss','src/scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: { livereload: 35729 }
            },
        },
    });

    // Loaded tasks
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-autoprefixer' );
    grunt.loadNpmTasks( 'grunt-notify' );
    grunt.loadNpmTasks( 'grunt-bake' );

    // Registered task(s).
    grunt.registerTask('default', ['notify']);
    grunt.registerTask('build', ['uglify', 'sass', 'autoprefixer', 'cssmin', 'bake', 'imagemin', 'copy']);
    grunt.registerTask('dev', ['connect', 'watch']);
};
