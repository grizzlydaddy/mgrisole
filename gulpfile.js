const 
  gulp = require('gulp')
  sass = require('gulp-sass'),
  plumber = require('gulp-plumber'),
  nodemon = require('gulp-nodemon'),
  sourcemaps = require('gulp-sourcemaps'),
  postcss = require('gulp-postcss'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  browserSync = require('browser-sync'),
  proxy = require('http-proxy-middleware');

gulp.task('browser-sync', ['nodemon', 'sass', 'js'], () => {
  browserSync({
    proxy: 'localhost:5000',
    port: 5001,
    notify: false
  });

  gulp.watch(['assets/stylesheets/*.sass', 'assets/javascripts/*.js', 'views/*.pug'], ['sass', 'js']);
});

gulp.task('sass', () => {
  return gulp.src('assets/stylesheets/*.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: [require('node-normalize-scss').includePaths] }))
    .pipe(postcss([
      require('autoprefixer')({ browsers: ['last 2 versions'] }),
      require('css-mqpacker')(),
      // require('cssnano')
    ]))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(browserSync.stream())
  ;
});

gulp.task('js', () => {
  return gulp.src('assets/javascripts/*.js')
    .pipe(plumber())
    .pipe(webpackStream(require('./webpack.config.js')), webpack)
    .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('nodemon', (cb) => {
  var called = false;
  nodemon()
    .on('start', () => {
      if(!called){
          called = true;
          cb();
      }
    })
    .on('restart', () => {
      console.log('>> server restart');
      setTimeout(() => {
          browserSync.reload({stream: false});
      }, 1000 )
    })
  ;
});

gulp.task('default', ['browser-sync'], () => {
  gulp.watch(['views/*.pug'], browserSync.reload)
});
