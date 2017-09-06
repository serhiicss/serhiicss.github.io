// gulpfile setup bsed on:
// https://aaronlasseigne.com/2016/02/03/using-gulp-with-jekyll/

const child = require('child_process');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const notify = require("gulp-notify");
const deploy = require('gulp-gh-pages');



const siteRoot = '_site';
const cssFiles = '_sass/**/*.sass';

gulp.task('css', () => {
	gulp.src(cssFiles)
		.pipe(sass().on("error", notify.onError()))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(gulp.dest('css'));
});

gulp.task('jekyll', () => {
	const jekyll = child.spawn('jekyll.bat', ['build',
		'--watch',
		'--incremental',
		'--drafts'
	]);

	const jekyllLogger = (buffer) => {
		buffer.toString()
			.split(/\n/)
			.forEach((message) => gutil.log('Jekyll: ' + message));
	};

	jekyll.stdout.on('data', jekyllLogger);
	jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
	browserSync.init({
		files: [siteRoot + '/**'],
		port: 3000,
		server: {
			baseDir: siteRoot
		}
	});

	gulp.watch(cssFiles, ['css']);
});


//---------------------------------------------
// Gulp task                                  |
//---------------------------------------------

gulp.task('default', ['css', 'jekyll', 'serve']);


//---------------------------------------------
// Push build to gh-pages                     |
//---------------------------------------------
gulp.task('deploy', () => {
  return gulp.src(['./_site/**/*', 'CNAME'])
    .pipe(deploy({branch: 'master'}));
});