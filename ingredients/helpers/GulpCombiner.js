var gulp = require('gulp');
var elixir = require('laravel-elixir');
var config = elixir.config;
var plugins = require('gulp-load-plugins')();

module.exports = function(options) {

    options.assets.forEach(function(set, index) {
        var fileName = set.concatName;

        // If we're dealing with multiple asset concats,
        // but the user didn't give us a filename to use
        // then we'll append the index to the filename
        // to prevent any possible collisions.
        if (options.assets.length !== 1 && fileName == 'all.' + options.extension) {
            fileName = fileName.replace('.' + options.extension, '-' + index + '.' + options.extension);
        }

        return gulp.src(set.src)
            .pipe(plugins.concat(fileName))
            .pipe(plugins.if(config.production, options.minifier.call(this)))
            .pipe(gulp.dest(set.to));
    });

};