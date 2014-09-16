var browserify = require('browserify');
var transform = require('vinyl-transform');
var gulp = require('gulp');

module.exports = function () {
  var browserified = transform(function (filename) {
    return browserify(filename).bundle();
  });
  return gulp.src(['client/game/main.js'])
             .pipe(browserified)
             .pipe(gulp.dest('dist/js'));
};

