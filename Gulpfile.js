const gulp  = require('gulp');
const path  = require('path');
const $     = require('gulp-load-plugins')();

const srcFolder     = './_assets/';
const destFolder    = './assets/';
const imagesOrder   = [
  path.join(srcFolder, 'img/**/*')
];
const fontsOrder    = [
  path.join(srcFolder, 'fonts/**/*')
];
const scriptsOrder  = [
  path.join('./node_modules/jquery/dist/jquery.js'),
  /*path.join('./node_modules/clipboard/dist/clipboard.js'),
  path.join('./node_modules/jquery-placeholder/jquery.placeholder.js'),
  path.join('./node_modules/jquery-validation/dist/jquery.validate.js'),
  path.join('./node_modules/jquery-validation/dist/additional-methods.js'),
  //path.join('./node_modules/@balidev/fast-live-filter/jquery.fastLiveFilter.js'),
  path.join('./node_modules/jquery-form-validator/form-validator/jquery.form-validator.js'),
  path.join('./node_modules/jquery-mousewheel/jquery.mousewheel.js'),
  path.join('./node_modules/jquery.event.move/js/jquery.event.move.js'),
  path.join('./node_modules/owl.carousel/dist/owl.carousel.js'),
  //path.join('./node_modules/'),*/

  path.join(srcFolder, 'js/dev/libs/*.js'),
  path.join(srcFolder, 'js/dev/libs/plugins/*.js'),
  path.join(srcFolder, 'js/dev/modules.js')
];
const stylesOrder   = [
  path.join(srcFolder, 'less/style.less'),
  path.join(srcFolder, 'less/custom.less'),
];

/**
 * Assets
 */
gulp.task('assets', ['assets_images', 'assets_fonts', 'assets_scripts']);
gulp.task('assets_images', ['clean'], () => {
  return gulp.src(imagesOrder)
             .pipe(gulp.dest(destFolder + 'img/'));
});
gulp.task('assets_fonts', ['clean'], () => {
  return gulp.src(fontsOrder)
             .pipe(gulp.dest(destFolder + 'fonts/'));
});
gulp.task('assets_scripts', ['clean'], () => {
  return gulp.src('./_assets/js/modernizr.js')
             .pipe(gulp.dest(destFolder + 'js/'));
});

/**
 * Clean
 */
gulp.task('clean', () => {
  return gulp.src(destFolder + '*')
             .pipe($.clean());
});

/**
 * Scripts
 */
gulp.task('scripts', () => {
  return gulp.src(scriptsOrder)
             .pipe($.concat('all.js'))
             .pipe(gulp.dest(destFolder + 'js/'));
});
gulp.task('scriptsMin', () => {
  return gulp.src(scriptsOrder)
             .pipe($.concat('all.js'))
             .pipe($.uglify())
             .pipe($.rename({ suffix: '.min' }))
             .pipe(gulp.dest(destFolder + 'js/'));
});

/**
 * Styles
 */
gulp.task('styles', () => {
  return gulp.src(stylesOrder)
             .pipe($.concat('all.css'))
             .pipe($.less({ paths: ['./node_modules/' ] }))
             .pipe(gulp.dest(destFolder + 'css/'));
});
gulp.task('stylesMin', () => {
  return gulp.src(stylesOrder)
             .pipe($.concat('all.css'))
             .pipe($.less({ paths: ['./node_modules/' ] }))
             .pipe($.minifyCss({ mediaMerging: false, processImport: false }))
             .pipe($.rename({ suffix: '.min' }))
             .pipe(gulp.dest(destFolder + 'css/'));
});

/**
 * Watch
 */
gulp.task('watch', () => {
  gulp.watch(scriptsOrder, ['scripts']);
  gulp.watch(stylesOrder, ['styles']);
});

/**
 * Root Tasks
 */
gulp.task('dev', ['assets', 'scripts', 'styles']);
gulp.task('prod', ['clean','assets', 'scriptsMin', 'stylesMin']);
gulp.task('default', ['prod']);