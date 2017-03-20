var gulp = require('gulp');
var webpack = require('webpack-stream');

// Webpack
gulp.task('webpack', function() {
  return gulp.src('./client/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/client'));
});

gulp.task('index', function() {
	return gulp.src('./client/index.html')
		.pipe(gulp.dest('./dist/client'))
});

gulp.task('server', function() {
	return gulp.src('./server/**/*')
		.pipe(gulp.dest('./dist/server'))
});

gulp.task('watch-front', function() {
	gulp.watch('./client/**/*', ['webpack', 'index'])
});

gulp.task('watch-back', function() {
	gulp.watch('./server/**/*', ['server'])
});

gulp.task('default', ['webpack', 'index', 'server', 'watch-front', 'watch-back']);

gulp.task('build', ['webpack', 'index', 'server']);
