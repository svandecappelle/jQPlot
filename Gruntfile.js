/*global module */
module.exports = function (grunt) {

    "use strict";
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            min: {
                files: grunt.file.expandMapping(['src/core/*.js', 'src/plugins/**/*.js'], 'dist/', {
                    rename: function (destBase, destPath) {
                        return destBase + destPath.replace("src/", "").replace('.js', '.min.js');
                    }
                })
            },
            dev: {
                files: grunt.file.expandMapping(['src/core/*.js', 'src/plugins/**/*.js'], 'dist/', {
                    rename: function (destBase, destPath) {
                        return destBase + destPath.replace("src/", "").replace('.js', '.min.js');
                    }
                }),
                options: {
                    beautify: true,
                    mangle: false,
                    sourceMap: true
                }
            }
        },
        cssmin: {
            target: {
                files: grunt.file.expandMapping(['src/core/*.css', 'src/plugins/**/*.css'], 'dist/', {
                    rename: function (destBase, destPath) {
                        return destBase + destPath.replace("src/", "").replace('.css', '.min.css');
                    }
                })
            }
        },
        jsdoc : {
            dist : {
                options: {
                    destination : './docs',
                    configure : ".jsdoc.json"
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-jsdoc');

    // Default task(s).
    grunt.registerTask('default', ['uglify:min', 'cssmin']);
    grunt.registerTask('dev', ['uglify:dev']);

};
