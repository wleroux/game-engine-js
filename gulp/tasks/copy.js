var gulp = require('gulp');

module.exports = function () {
  return gulp.src(['public/**'])
             .pipe(gulp.dest('dist'));
};

