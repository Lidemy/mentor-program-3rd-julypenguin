/* eslint no-param-reassign: "error" */

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

function css() {
  return gulp
    .src('./src/sass/*.{sass,scss}') // 來源檔案
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError)) // sass 編譯
    .pipe(minifyCSS()) // 把 CSS 壓縮
    .pipe(rename((path) => { // 改個檔名
      path.basename += '.min'; // 改參數會被 ESLint 碎碎念，最上面加了一條封口令
      path.extname = '.css';
    }))
    .pipe(sourcemaps.write('.')) // 有 sourcemaps 的話在 err 的時候會顯示漂亮的換行格式
    .pipe(gulp.dest('./build/css')); // 輸出檔案
}

function js() {
  return gulp
    .src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] })) // babel 轉換成 ES5
    .pipe(uglify()) // 把 JS 檔壓縮
    .pipe(rename((path) => {
      path.basename += '.min';
      path.extname = '.js';
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/javascript'));
}

function isWatch() {
  gulp.watch('./sass/**/*.sass', css); // 只要 SASS 有修改就會自動執行 css function
  gulp.watch('./src/**/*.js', js); // 只要 JS 有修改就會自動執行 js function
}

const build = gulp.series(css, js, isWatch); // 把多個方法一次執行，這個是同步的

gulp.task('default', build); // default 就是 terminal 只要輸入 gulp 就會執行
