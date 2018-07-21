'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;


gulp.task('styles', () => {
  return gulp.src('./styles/src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./styles/bundle'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('./js/index.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./js/bundle'))
    .pipe(reload({stream: true}));
  });

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './'  
  })
});


gulp.task('watch', function() {
  gulp.watch('./js/*.js', ['scripts']);
  gulp.watch('./styles/src/*/*.scss', ['styles']);
  gulp.watch('*.html', reload);
});

gulp.task('default', ['browser-sync','styles', 'scripts', 'watch']);