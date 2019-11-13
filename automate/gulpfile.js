const
	gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	concat_ = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	sass = require('gulp-sass'),
	includeHtml = require('gulp-file-include'),
	sassGlob = require('gulp-sass-glob');


/*  > > > BUILDS TASKS < < < */
// Clone all files to folder './dist':
gulp.task('clone', () =>
	gulp.src(['./assets', './index.html'])
		.pipe(gulp.dest('./dist/'))
);

// Move all assets files to dist/asstes:
gulp.task('assets', () =>
	gulp.src('./assets/**/*')
		.pipe(gulp.dest('./dist/assets'))
);


// Use ccsNano package to minify .css files:
gulp.task('nanocss', function () {
	return gulp.src('./dist/assets/**/*.css')
		.pipe(gulp.dest('./dist/assets'))
})

// Compress images files using imagemin package
gulp.task('minimages', () =>
	gulp.src('./dist/assets/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/assets/images'))
);

// Tasks enqueue
gulp.task('build', gulp.series('clone', 'assets', 'nanocss', 'minimages'));


/*  > > > DEVELOPMENT TASKS < < < */
function runSass() {
	return gulp.src('./sass/**/*.scss')
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(gulp.dest('./assets/styles'));
}

function compileHtml() {
	return gulp.src([
		'./src/**/*.html',
		'!./src/includes/**'
	])
		.pipe(includeHtml())
		.pipe(
			gulp.dest('./')
		)
}

function buildJs() {
	return gulp.src(['./webpack/library/jquery.min.js', './webpack/library/popper.min.js', './webpack/library/bootstrap.min.js', './webpack/app/bundle.js'])
		.pipe(concat_('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/scripts'))
}

// Main function to development tasks
gulp.task('develop', function () {
	gulp.watch('./sass/**/*.scss', runSass);
	gulp.watch('./webpack/**/*.js', buildJs);
	gulp.watch('./src/**/*.html', compileHtml);
});
