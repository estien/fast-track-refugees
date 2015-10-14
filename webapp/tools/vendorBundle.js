var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var production = $.util.env.production;

function vendorBundle() {
  // A dummy entry point for browserify
  gulp.src('./noop.js', { read: false })
  .pipe($.browserify({
      debug: true
    })
  )
  .pipe($.if(production, $.uglify()))
  .pipe($.rename('libs.js'))
  .pipe(gulp.dest('../../public/js'));
};

gulp.task('js:vendor', vendorBundle);