'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var importer = require('node-sass-globbing');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

var sass_config = {
  importer: importer,
  includePaths: [
    'node_modules/breakpoint-sass/stylesheets/',
  ]
};

gulp.task('browser-sync', function() {
    browserSync.init({
      server: {
        baseDir: ''
      },
    });
    gulp.watch("./sass/**/*.scss", ['sass']);
    gulp.watch('*.html', browserSync.reload);
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass(sass_config).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('default', [ 'browser-sync']);
