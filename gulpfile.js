// gulpfile setup bsed on:
// https://aaronlasseigne.com/2016/02/03/using-gulp-with-jekyll/

const child = require('child_process');
const browserSync = require('browser-sync').create();

const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const notify = require("gulp-notify");



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

gulp.task('default', ['css', 'jekyll', 'serve']);
<<<<<<< HEAD
<<<<<<< HEAD
=======


//---------------------------------------------
// Push build to gh-pages                     |
//---------------------------------------------
gulp.task('deploy', function () {
  return gulp.src("./site/**/*")
    .pipe(deploy())
});
>>>>>>> parent of c686a37... gulp deploy task added
=======
>>>>>>> parent of bd4bbb1... Update 2017-09-06T11:24:35.826Z
