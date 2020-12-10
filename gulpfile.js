// Requires
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var exec = require('child_process').exec;
var browserSync = require('browser-sync').create();
var cssnano = require('cssnano'); // minifies CSS
var consolidate = require("gulp-consolidate");
var autoprefixer = require('autoprefixer');
var unprefix = require("postcss-unprefix"); // deletes old prefixes using browsersList variable
var flexbugs = require('postcss-flexbugs-fixes'); // flexbox fixes for IE
var gaps = require('postcss-gap-properties'); // gaps polyfill
var iconfont = require("gulp-iconfont");
var iconfontCss = require("gulp-iconfont-css");
var fs = require('fs');

var jekyllDir = "docs/",
    scssFile = 'framework/scss/cd44.scss',
    scssFileSwiper = 'node_modules/swiper/css/swiper.min.css',
    scssFileAos = 'node_modules/aos/dist/aos.css',
    cssDest = 'dist/css',
    jsMiscFiles = 'framework/js/misc/*.js',
    jsAbstractFiles = 'framework/js/**/abstract.js',
    jsFieldAbstractFile = 'framework/js/form/field/abstract.js',
    jsFieldFiles = 'framework/js/form/field/**/*.js',
    jsFormFiles = 'framework/js/form/layout/**/!(standard)*.js',
    jsComponentFiles = 'framework/js/**/*.js',
    jsFileSwiper = 'node_modules/swiper/js/swiper.min.js',
    jsFileAos = 'node_modules/aos/dist/aos.js',
    jsDest = 'dist/js';
distDest = 'dist/';
assetsFolders = ['framework/fonts/**', 'framework/images/**'];

var postCssPluginsDev = [
    unprefix(),
    autoprefixer({
        grid: true
    }),
    flexbugs(),
    gaps()
];

var postCssPluginsProd = [
    unprefix(),
    autoprefixer({
        grid: true
    }),
    flexbugs(),
    gaps(),
    cssnano()
];

gulp.task('build:css:cd44:dev', function () {
    return gulp.src([scssFileSwiper, scssFileAos, scssFile])
        .pipe(sass({
            // CSS non minifiée plus lisible ('}' à la ligne)
            outputStyle: 'expanded'
        }))
        .pipe(postcss(postCssPluginsDev))
        .pipe(concat('cd44.css'))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(cssDest));
});

gulp.task('build:css:cd44:prod', function () {
    return gulp.src([scssFileSwiper, scssFileAos, scssFile])
        .pipe(sass())
        .pipe(postcss(postCssPluginsProd))
        .pipe(concat('cd44.min.css'))
        .pipe(gulp.dest(cssDest));
});

gulp.task('build:js', function () {
    return gulp.src([jsFileSwiper, jsFileAos, jsMiscFiles, jsFieldAbstractFile, jsAbstractFiles, jsFieldFiles, jsFormFiles, jsComponentFiles])
        .pipe(concat('cd44.js'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('build:jekyll:fast', function (cb) {
    exec('cd ' + jekyllDir + ' && bundle exec jekyll build --incremental', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('build:jekyll', function (cb) {
    exec('cd ' + jekyllDir + ' && bundle install && bundle exec jekyll build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('build:glyphicons', function () {
    return gulp
        .src("framework/glyphicons/**/*")
        .pipe(
            iconfontCss({
                fontName: "ds44-icons",
                targetPath: "css/icons.css",
                fontPath: "/fonts/",
            }),
        )
        .pipe(
            iconfont({
                formats: ['ttf', 'eot', 'woff', 'woff2'],
                fontName: "fonts/ds44-icons", // identique au nom de iconfontCss
            }),
        )
        .pipe(gulp.dest(distDest));
});

gulp.task('build:demoicons', function () {
    return gulp.src("framework/glyphicons/**/*")
        .pipe(iconfont({
            fontName: 'iconfont',
            formats: ['ttf', 'eot', 'woff', 'woff2'],
            appendCodepoints: true,
            appendUnicode: false,
            normalize: true,
            fontHeight: 1000,
            centerHorizontally: true
        }))
        .on('glyphs', function (glyphs, options) {
            gulp.src('iconfont/demo-icons.html')
                .pipe(consolidate('underscore', {
                    glyphs: glyphs,
                    fontName: options.fontName
                }))
                .pipe(gulp.dest('docs/_variations/icons/'));
        })
        .pipe(gulp.dest('framework/fonts/'));
});

// cd .docker && docker-compose exec site gulp createComponent --name button
gulp.task('createComponent', function () {
    var componentName = "ttest";

    var writeStream = fs.createWriteStream("framework/scss/components/_" + componentName + ".scss");
    writeStream.write("// " + componentName);
    writeStream.end();
});

gulp.task('build:ds', gulp.parallel(
    'build:css:cd44:dev',
    'build:css:cd44:prod',
    'build:glyphicons',
    'build:demoicons',
    'build:js',
    function () {
        return gulp.src(assetsFolders, { base: 'framework' })
            .pipe(gulp.dest('dist'));
    })
);

gulp.task('build', gulp.parallel(
    'build:jekyll',
    'build:ds'
));

gulp.task('serve', gulp.series('build', function () {

    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        port: 4000,
        ghostMode: false, // do not mirror clicks, reloads, etc. (performance optimization)
        logFileChanges: true,
        open: false       // do not open the browser (annoying)
    });

    gulp.watch('docs/**/*', { interval: 500, usePolling: true }, gulp.series('build:jekyll:fast', function (done) {
        browserSync.reload();
        done();
    }));

    // Watch framework .scss files
    gulp.watch(['framework/scss/**/*.scss'], { interval: 500, usePolling: true }, gulp.series('build:css:cd44:dev'));

    // Watch framework .js files
    gulp.watch('framework/js/**/*.js', { interval: 500, usePolling: true }, gulp.series('build:js', function (done) {
        browserSync.reload();
        done();
    }));

}));

gulp.task('default', gulp.series('build'));
