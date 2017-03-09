var gulp = require('gulp');
		shell = require('gulp-shell');
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		autoprefixer   = require('gulp-autoprefixer'),
		bourbon        = require('node-bourbon'),
		notify         = require("gulp-notify");


gulp.task('sass', function() {
	return gulp.src('_sass/styles.sass')
	.pipe(sass({
		includePaths: bourbon.includePaths
	}).on("error", notify.onError()))
	//.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	//.pipe(cleanCSS())
	.pipe(gulp.dest('css'))
	.pipe(browserSync.reload({stream: true}));
});

// Task for building blog when something changed:
// gulp.task('build', shell.task(['bundle exec jekyll build --watch']));
// Or if you don't use bundle:
gulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_sass/**/*.sass', ['sass']);
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'build', 'serve']);