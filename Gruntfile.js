// Hello, this an automation file for web development. To use htmllint >>> grunt htmllint

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: ['src/**/*.js'],
                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: '/*! MyLib.js 1.0.0 | P.V. | MIT Licensed */'
                },
                    files: {
                    'dist/css/style.min.css': ['**/style.css']
                }
          }
        },
        htmllint: {
            all: ['**/index.html']
        },
        bootlint: {
            options: {
                stoponerror: false,
                relaxerror: []
            },
            files: ['./index.html']
        },
        watch: {
            files: ['<%= jshint.files %>', '**/*.html', '**/*.css'],
            tasks: ['jshint'],
            options: {
                livereload: true
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '**/*.css',
                        '**/*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./"
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-html');
    grunt.loadNpmTasks('grunt-bootlint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');


    grunt.registerTask('default', ['jshint', 'bootlint','browserSync', 'watch']);

};
