// Load plugins
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    connectPHP = require('gulp-connect-php'),
    minifycss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    glob = require('glob'),
    path = require('path'),
    es = require('event-stream'),
    browserSync = require('browser-sync');


// Clean build folders
gulp.task('clean', function() {
  return del(['dist/build/*']);
});

// html
gulp.task("html", function() {
    gulp.src(".//**/*.html")
    .pipe(gulp.dest("./dist"))
});

// LINT
gulp.task('lint', function () {
  return gulp.src(['./src/*/*.js', '!./src/vendor/*'])
  .pipe(jshint())
  .pipe(jshint.reporter('default', { verbose: true }))
  .pipe(jshint.reporter('fail'));
});

// Styles
gulp.task('css', function() {
  gulp.src('./assets/css/feature/*.css')
    .pipe(concatCss("feature.css"))
    .pipe(gulp.dest('dist/build/css'));
});

// Scripts
gulp.task('js', ['lint'], function(done) {

    glob("./assets/js/feature/*.js", function(err, files){
        if(err) {
           done(err);
        }

        var tasks = files.map(function(entry){
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(path.basename(entry)))
                .pipe(gulp.dest('./dist/build/js'));
        });

        es.merge(tasks).on('end', done);
    });

});

gulp.task("jsMove", function() {
    gulp.src("./src/router.js")
    .pipe(gulp.dest("./dist"))
    gulp.src("./src/vendor/*")
    .pipe(gulp.dest("./dist/vendor/"))
    gulp.src("./src/assets/json/*")
    .pipe(gulp.dest("./dist/assets/json/"))
});

//Watch
gulp.task("watch", function(){
    gulp.watch("./assets/js/*.js", ["js"]);
    gulp.watch("./assets/js/*.js", ["jsMove"]);
    // gulp.watch("./src/**/*.html", ["html"]);
    gulp.watch("./assets/css/*.css", ["css"]);
});


gulp.task('connect-sync', function() {
  connectPHP.server({}, function (){
    browserSync({
      proxy: '127.0.0.1:8000'
    });
  });
 
  gulp.watch('**/*.php').on('change', function () {
    browserSync.reload();
  });

});

// Connect Server Setup
gulp.task('connect', function() {
    // connect.server();
    // connectPHP.server();
});
// Default task
// gulp.task('default', ['clean', /* 'html',*/ 'js', 'jsMove', 'css', 'connect', 'watch'], function() {
// gulp.task('default', ['js', 'connect', 'watch'], function() {
// gulp.task('default', ['connect'], function() {
gulp.task('default', ['clean', 'js', 'jsMove', 'css', 'connect-sync', 'watch'], function() {
    console.log("Done");
});
