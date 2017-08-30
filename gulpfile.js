// require('dotenv').config()

const gulp = require('gulp')
const gutil = require('gulp-util')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
// const eslint = require('gulp-eslint')
const webpack = require('gulp-webpack')
//
const browserSync = require('browser-sync')
const nodemon = require('gulp-nodemon')

gulp.task('css', function() {
  gulp.src('./client/_main.scss')
    .pipe(rename('style.css'))
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
})

// gulp.task('fonts', function() {
//   return gulp.src('./src/icons/fonts/**')
//     .pipe(gulp.dest('./dist/fonts'))
//     .pipe(browserSync.stream())
// })
//
// gulp.task('lint', function() {
//
//   return gulp.src(['**/*.js','!node_modules/**', '!dist/**/*.js'])
//     // eslint() attaches the lint output to the "eslint" property
//     // of the file object so it can be used by other modules.
//     .pipe(eslint())
//     // eslint.format() outputs the lint results to the console.
//     // Alternatively use eslint.formatEach() (see Docs).
//     .pipe(eslint.format())
//
// })
//
gulp.task('js', function() {
  return gulp.src('client/_main.js')
    .pipe(webpack({
      module: {loaders: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]}
    }))
    .pipe(rename('main.js'))
    .on('error', gutil.log)
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
})

gulp.task('default', ['css', 'js'])

gulp.task('watch', function() {
  gulp.watch(['client/**/*.scss'], ['css'])
  // watch CLIENT SIDE JS
  gulp.watch(['client/**/*.js'], ['js'])

  return nodemon({

    script: 'server/index.js',

    // watch SERVER SIDE files
    // note we are NOT watching components even though most of these render
    // server-side as well.
    watch: ['server/**/*.js']

  }).once('start', function() {
    browserSync.init({
      proxy: 'http://localhost:' + 3030,
      port: 3031
    })
  }).on('restart', browserSync.reload)
})
