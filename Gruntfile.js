module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
        min: {
            files: grunt.file.expandMapping(['src/core/*.js', 'src/plugins/**/*.js'], 'dist/', {
                rename: function(destBase, destPath) {
                    return destBase + destPath.replace("src/", "").replace('.js', '.min.js');
                }
            })
        },
        dev: {
            files: grunt.file.expandMapping(['src/core/*.js', 'src/plugins/**/*.js'], 'dist/', {
                rename: function(destBase, destPath) {
                    return destBase + destPath.replace("src/", "").replace('.js', '.min.js');
                }
            }),
            options: {
                beautify: true,
                mangle: false,
                sourceMap: true
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['uglify:min', 'cssmin']);
    grunt.registerTask('dev', ['uglify:dev']);

};
