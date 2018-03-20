var gulp = require('gulp');

var concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync');

// options
var pathApp = './app/',
  pathJS = './app/assets/js/',
  pathCSS = './app/assets/scss/';

// Compile Our Sass at Client Interface
gulp.task('sass', function () {
  console.log('sass compiling');
  return gulp.src(pathCSS + '**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(pathApp + 'css/'));
  // .pipe(browserSync.reload);
});

// Concat-min js at Client Interface
gulp.task('js', function () {
  console.log('js compiling');
  return gulp.src(pathJS + '**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest(pathApp + 'js/'));
  // .pipe(browserSync.reload);
});


// Watch Files For Changes
gulp.task('watch', [], function () {
  browserSync({
    notify: false,
    server: {
        baseDir: '.'
    }
  });
  gulp.watch(pathJS + '**/*.js', ['js']);
  gulp.watch(pathCSS + '**/*.scss', ['sass']);
  gulp.watch(pathApp + '**/*', browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
});

// Default Task
gulp.task('default', ['sass', 'js', 'watch']);