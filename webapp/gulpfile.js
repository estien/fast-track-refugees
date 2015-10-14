var gulp = require('gulp');
var util = require('util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var _ = require('lodash');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

var production = $.util.env.production;

require('./tools/vendorBundle');

function bundle(watch) {

  var bro;	

  if (watch) {
    bro = watchify(browserify('./client/js/app.js',
        // Assigning debug to have sourcemaps
        _.assign(watchify.args, {
            debug: true
        })
      ).external('react')
    );
    bro.on('update', function() {
        rebundleJs(bro);
    });
  } 
  else {
    bro = browserify('./client/js/app.js', {
        debug: true
    });
  }

  bro.transform(babelify.configure({
      compact: false
  }));

  function rebundleJs(bundler) {
    util.log('Rebundling js');
    return bundler.bundle()
      .on('error', function(e) {
          util.log('Browserify Error', e);
          this.emit('end');
      })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({
          loadMaps: true
      }))
      .pipe($.sourcemaps.write())
      .pipe(browserSync.stream({match: '**/*.js'}))
      .pipe(gulp.dest('./public/js'));
  }

  return rebundleJs(bro);
}

gulp.task('css', function() {

  gulp.src('client/css/app/app.css')
    .pipe($.cssnext({
      compress: production,
      sourcemap : !production
    }))
    .pipe(browserSync.stream({match: '**/*.css'}))
    .pipe(gulp.dest('./public/css/'));

  gulp.src('client/css/framework/framework.css')
    .pipe($.cssnext({
      compress: production,
      sourcemap : !production
    }))
    .pipe(browserSync.stream({match: '**/*.css'}))
    .pipe(gulp.dest('./public/css/'));

});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      proxy: 'localhost:3000',
      notify: false
  });
});

gulp.task('js:app', function() {
  bundle(false);
});

gulp.task('js:app:watch', function() {
  bundle(true);
});

gulp.task('css:watch', function() {
  gulp.watch('./client/css/**/*.css', ['css']);
});

gulp.task('views:watch', function() {
  gulp.watch('./server/views/**/*.hbs').on('change', browserSync.reload);
});

gulp.task('watch', ['js:app:watch', 'css:watch', 'views:watch']);

gulp.task('default', ['browser-sync', 'watch', 'js:vendor', 'css']);
gulp.task('production', ['js:app', 'js:vendor', 'css']);
