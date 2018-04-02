var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var uncss = require('gulp-uncss');

// Locations
var hmtlDest = './';
var cssTemp = './src/cssTemp';
var cssDest = './c';
var jsDest = './j';

var dest = './'

// Uglify JS
gulp.task('uglify-JsFiles', function() {
    return gulp.src(['./src/js/type-kern-only.js','./src/js/mp.js'])
        .pipe(concat('mpkern.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

// Process all CSS
gulp.task('cssMinify', function () {
  var plugins = [
	atImport,
	autoprefixer,
	cssnano
  ];
  return gulp.src('./src/css/textblock.min.css')
    .pipe(uncss({
      html: ['./src/index.dev.html']
    }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(cssDest));
});

// Minify HTML
gulp.task('htmlMinify', function() {
  return gulp.src('./src/index.dev.html')
    .pipe(htmlmin({removeComments: true}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(hmtlDest));
});

gulp.task('build', [ 'uglify-JsFiles','cssMinify','htmlMinify' ]);

gulp.task('serve', ['build'], function () {
  browserSync.init({
    server: dest,
    injectChanges: true,
    notify: false
  })

  gulp.watch('./src/js/*.js', ['uglify-JsFiles'])
  gulp.watch('./src/index.dev.html', ['htmlMinify'])
  gulp.watch('./src/css/*.css', ['cssMinify'])

  gulp.watch(['index.html','./j/*.*','./c/*.*','./i/*.*']).on('change', browserSync.reload);
})

gulp.task('default', ['serve'])
