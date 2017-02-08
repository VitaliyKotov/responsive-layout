'use strict'

var gulp = require("gulp"),
  del = require('del'),
  sass = require('gulp-sass'),
  scssLint = require('gulp-scss-lint'),
  scssLintStylish = require('gulp-scss-lint-stylish'),
  cleanCSS = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  sourcemaps = require('gulp-sourcemaps');

gulp.task("styles", function() {
  return gulp.src("scss/main.scss")
    // .pipe(scssLint({ customReport: scssLintStylish }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      basename: "style",
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("styles"))
});
gulp.task('clean', function(cb) {
  return del(['styles'], cb);
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles');
});

/* adding 'watch' task */
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['styles']);
});

/* fixing 'default' task */
gulp.task('default', ['clean'],
  function() {
    gulp.start('styles', 'watch');
  }
);