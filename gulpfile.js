var gulp = require('./gulp')([
  'browserify',
  'copy'
])

gulp.task('default', ['browserify', 'copy']);

