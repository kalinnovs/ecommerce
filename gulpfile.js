// Load plugins
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat')
    connectPHP = require('gulp-connect-php'),
    minifycss = require('gulp-minify-css')
    minifyJS = require('gulp-minify'),
    concatCss = require('gulp-concat-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    browserify = require('gulp-browserify'),
    prefix = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    glob = require('glob'),
    path = require('path'),
    es = require('event-stream'),
    browserSync = require('browser-sync');

// var nodeService = require('./HaastikaNodeService/service/HaastikaNodeService');

gulp.task('styles', function() {
  return gulp.src('./assets/css/feature/*.css')
    .pipe(concatCss("feature.css"))
    .pipe(gulp.dest('dist/build/css'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('dist/build/css/feature.css')
    .pipe(minifycss())
    .pipe(rename('feature.min.css'))
    .pipe(gulp.dest('dist/build/css'));
});

// Lint checker
gulp.task('lint-client', function() {
  return gulp.src('./assets/js/feature/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browserify-client', ['lint'], function() {
  return gulp.src('./assets/js/feature/*.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('feature.js'))
    .pipe(gulp.dest('dist/build/js'));
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('dist/build/js/feature.js')
    .pipe(minifyJS())
    .pipe(uglify())
    .pipe(rename('feature.min.js'))
    .pipe(gulp.dest('dist/build/js'));
});


gulp.task('watch', function() {
  gulp.watch('app/**/**/*.js', ['uglify']);
  gulp.watch('./assets/css/*.css', ['minify']);
});

// Clean build folders
gulp.task('clean', function() {
  return del(['dist/*']);
});

// LINT
gulp.task('lint', function () {
  return gulp.src(['./src/*/*.js', '!./src/vendor/*'])
  .pipe(jshint())
  .pipe(jshint.reporter('default', { verbose: true }))
  .pipe(jshint.reporter('fail'));
});

gulp.task('connect-sync', function() {
  connectPHP.server({}, function (){
    browserSync({
      proxy: '127.0.0.1:8000',
      ghostMode: false,
      notify:false,
      browser:'google chrome'
    });
  });
});

// Default task
gulp.task('build', ['clean', 'minify', 'uglify']);
gulp.task('default', ['clean', 'minify', 'uglify', 'connect-sync', 'watch']);
