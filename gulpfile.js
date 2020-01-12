const gulp = require('gulp');
const scss = require('gulp-sass');
const browserSync = require('browser-sync').create();
const webpackStream = require('webpack-stream');
const clean = require('gulp-clean-css');
const webpackConfig = require('./webpack.config.js');

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('js', () => {
  return gulp.src('./src/js/index.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('./public/'));
});

gulp.task('scss', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(clean({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public'));
});

gulp.task('default', function() {
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
});

