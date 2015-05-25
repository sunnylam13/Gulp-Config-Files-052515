// this is a little Node program, running on a Node server
// require() will look inside of a folder and get information, similar to import

// NOTE:  gulpfile.js must be in the main directory

// if you don't know what these gulp plugins do you can Google them
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');

////////////////////////////////////////////
// 		JADE COMPILE
////////////////////////////////////////////

gulp.task('jade', function() {
	var jade_locals = {};

	// using src = ./*.jade causes index.layout.jade to also compile which we don't want... unless we have multiple main directory files... in which case we do use ./*.jade
	// otherwise use src = ./index.jade if there aren't other jade files in ./ (i.e. contact.jade, about.jade, etc.)
	return gulp.src('./index.jade')
		.pipe(plumber())
		.pipe(jade({
			locals: jade_locals,
			pretty: true
		}))
		.pipe(gulp.dest('./'))
});

////////////////////////////////////////////
// 		END JADE COMPILE
////////////////////////////////////////////


////////////////////////////////////////////
// 		SASS COMPILE
////////////////////////////////////////////

gulp.task('sass', function () {
	return gulp.src('css/*.scss')
				// Anne's recommendation is to use plumber() to automatically keep Gulp running despite any errors... you're not automatically booted out
				.pipe(plumber())
				.pipe(sass({
					'sourcemap=none':true,
					'errLogToConsole':true
				}))
				.pipe(concat('style.css'))
				// automatically add vendor prefixes to your CSS so you never have to write them
				.pipe(autoprefixer({
		            browsers: ['last 2 versions'],
		            cascade: false
		        }))
		        // .pipe(minifyCss({compatibility: 'ie8'}))
				.pipe(gulp.dest('css/'))
				// you need this for BrowserSync so it can auto update your CSS in the browser
				.pipe(browserSync.stream());

});


////////////////////////////////////////////
// 		END SASS COMPILE
////////////////////////////////////////////





////////////////////////////////////////////
// 		BROWSER SYNC
////////////////////////////////////////////

gulp.task('server', ['sass','jade'], function() {

	// this starts up your Browser Sync server so that you can preview your web page... that's all it does... start the ignition
    browserSync.init({
        server: "./",
    });

    // this assumes you have a ./css/ folder with style.scss and style.css
    gulp.watch("css/*.scss", ['sass']);
    
    // to get SASS partials to trigger changes
    // the SCSS partials need to be in their own folder because css/*.scss causes all of them to trigger in the same directory, in the order they currently are which messes up everything
    // this assumes that you have a ./css/partials folder with all your SCSS partial files
    gulp.watch("css/partials/*.scss", ['sass']);
    
    // this assumes you have .jade files in your main directory (./)
    gulp.watch('./*.jade',['jade']);
    
    // to get jade partials to trigger changes
    // this assumes you have jade partials (similar to SCSS partials) in a ./includes/ folder
    gulp.watch('includes/*.jade',['jade']);
    
    // whenever the .js files change reload
    // this assumes you have a ./js/ folder
    // it is setup to watch changes to 'those' files in 'that' folder
    gulp.watch("js/*.js").on('change', reload);
    
    // whenever the .css file changes reload
    // it is setup to watch changes to 'those' files in 'that' folder
    gulp.watch("css/*.css").on('change', reload);
    
    // whenever the .html file changes reload
    // this only watches changes to .html files in your main directory (./)
    // it is setup to watch changes to 'those' files in 'that' folder
    gulp.watch("*.html").on('change', reload);
});

////////////////////////////////////////////
// 		END BROWSER SYNC
////////////////////////////////////////////



////////////////////////////////////////////
// 		DEFAULT
////////////////////////////////////////////

gulp.task('default', ['server'], function () {	
	// place everything in here in 'server'
	// if you weren't using Browser Sync's server you would place all of your gulp.watch() tasks here instead of in the 'server' task above
});

////////////////////////////////////////////
// 		END DEFAULT
////////////////////////////////////////////


