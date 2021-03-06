'use strict';

const sourceFolder = 'source/';
const destinationFolder = 'build/';

const path = {
    src: {
        img: sourceFolder + 'img/',
        html: sourceFolder + '*.html',
        scss: sourceFolder + 'sass/style.scss',
        js: sourceFolder + 'js/**/',
        fonts: sourceFolder + 'fonts/'
    },

    dest: {
        img: destinationFolder + 'img/',
        html: destinationFolder,
        css: destinationFolder + 'css/',
        js: destinationFolder + 'js/',
        fonts: destinationFolder + 'fonts/'
    },

    watch: {
        img: sourceFolder + 'img/',
        html: sourceFolder + '**/*.html',
        scss: sourceFolder + 'sass/**/*.scss',
        js: sourceFolder + 'js/**/*.js'
    }
}

const gulp = require('gulp');
const server = require('browser-sync').create();
const fileInclude = require('gulp-file-include');

var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var rename = require('gulp-rename');

var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var webp = require('gulp-webp');

const del = require('del');

var concat = require('gulp-concat');

gulp.task('concatMainJs', function() {
  return gulp.src('source/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('concatVendorJs', function() {
  return gulp.src('source/libs/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('concatCss', function() {
  return gulp.src(['build/css/normalize.css', 'build/css/swiper-bundle.min.css', 'build/css/style.css'])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css'));
});

// Удалкние папки build
gulp.task('clean', function () {
    return del('build');
});

// Startы the server
gulp.task('server', function () {
    server.init({
        server: 'build/',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch(path.watch.scss, gulp.series('scssToCss', 'concatCss'));
    // gulp.watch('source/img/icon-*.svg', gulp.series('sprite', 'refresh'));
    gulp.watch(path.watch.html, gulp.series('html', 'refresh'));
});

// Refreshes the server
gulp.task('refresh', function (done) {
    server.reload();
    done();
});

// Копирование файлов в build
gulp.task('copy', function () {
    return gulp.src([
        'source/fonts/**/*.{woff,woff2}',
        'source/*.ico',
        'source/css/*.css',
        'source/pixel-glass/**/*.*',
        'source/img/**/*.webp'

    ], {
        base: 'source'
    })
        .pipe(gulp.dest('build'));
});

// Copies html files to the build directory
gulp.task('html', function () {
    return gulp.src(path.src.html)
        .pipe(fileInclude())
        .pipe(gulp.dest(path.dest.html));
});


// Converts SCSS to CSS
gulp.task('scssToCss', function () {
    return gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest(path.dest.css))
        .pipe(server.stream());
});

// Сжатие картинок
gulp.task('images', function () {
    return gulp.src([
        'source/img/**/*.{png,jpg,svg}',
        //'!source/img/models/**/*.*'
    ])
        .pipe(imagemin([
          imagemin.optipng({optimizationLevel: 3}),
          imagemin.jpegtran({quality: 75, progressive: true}),
          imagemin.svgo()
        ]))
        .pipe(gulp.dest('build/img'));
});

// Создание SVG спрайта
gulp.task('sprite', function () {
    return gulp.src('build/img/icon-*.svg')
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('build/img'));
});

// Преобразование в webp
gulp.task('webp', function () {
    return gulp.src('source/img/content/**/*.{png,jpg}')
        .pipe(webp({ quality: 90 }))
        .pipe(gulp.dest('source/img/content'));
});

gulp.task('build', gulp.series('clean', 'copy', 'html', 'scssToCss', 'concatCss', 'images', 'sprite', 'concatMainJs', 'concatVendorJs'));
gulp.task('start', gulp.series('build', 'server'));




