var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var bower = require('gulp-bower');
var jade = require('gulp-jade');

var paths = {
	jade: 'app/**/*.jade',
	js: 'app/**/*.js'
};

gulp.task('jshint', function() {
    console.log('run 2');
    gulp.src('./*.js')
        .pipe(jshint())
});
gulp.task('bower', function(){
    console.log('run 5');
	return bower()
		.pipe(gulp.dest('public/lib'));
});
gulp.task('concat', function(){
    console.log('run 4');
	gulp.src(paths.js)
	.pipe(concat('index.js'))
	.pipe(gulp.dest('public/js'))
});

gulp.task('jade', function(){
    console.log('run 3');
	gulp.src(paths.jade)
	.pipe(jade())
	.pipe(gulp.dest('./public/'))
});

gulp.task('server', function() {
    console.log('run 1');
    nodemon({
            script: 'index.js',
            ext: 'html js',
            ignore: ['ignored.js']
        })
        .on('change', ['jshint'])
        .on('restart', ['jshint'], function() {
            console.log('server restarted')
        })
});

gulp.task('build',['jshint','jade','concat','bower']);
gulp.task('default', ['server','build']);
// gulp.task('reload', ['jshint','jade','concat','bower']);


