var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var bower = require('gulp-bower');
var jade = require('gulp-jade');

var paths = {
	jade: 'app/index.jade',
	js: 'app/**/*.js'
};

gulp.task('jshint', function() {
    gulp.src('./*.js')
        .pipe(jshint())
});
gulp.task('bower', function(){
	return bower('./bower_components')
		.pipe(gulp.dest('public/lib'));
});
gulp.task('concat', function(){
	gulp.src(paths.js)
	.pipe(concat('index.js'))
	.pipe(gulp.dest('public/js'))
});

gulp.task('jade', function(){
	gulp.src(paths.jade)
	.pipe(jade())
	.pipe(gulp.dest('./public/'))
});

gulp.task('develop', function() {
    nodemon({
            script: 'index.js',
            ext: 'html js',
            ignore: ['ignored.js']
        })
        // .on('change', ['lint'])
        .on('restart', ['reload'], function() {
            console.log('restarted!')
        })
});
gulp.task('default', ['jshint','jade','concat','bower','develop']);
gulp.task('reload', ['jshint','jade','concat','bower']);