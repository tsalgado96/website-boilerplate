const gulp         = require('gulp');
const imagemin     = require('gulp-imagemin');
const uglify       = require('gulp-uglify');
const sass         = require('gulp-sass');
const browserSync  = require('browser-sync');
const prefix       = require('gulp-autoprefixer');
const concat       = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task   - Define tasks
  gulp.src    - Point to files to use
  gulp.dest   - Point to folder to output
  gulp.watch  - Watch files and folders for changes
*/

// Copy ALL HTML Files
gulp.task('copyhtml', function(){
  gulp.src('src/*.html')
      .pipe(gulp.dest('public'));
  browserSync.reload();
});

// Copy ALL CSS File
gulp.task('copycss', function(){
  gulp.src('src/css/*.css')
      .pipe(gulp.dest('public/css'));
  browserSync.reload();
});

// Optimize Images
gulp.task('imagemin', function(){
  gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'));
  browserSync.reload();
});

// Compile Sass
gulp.task('sass', function(){
  gulp.src('src/css/*.sass')
      .pipe(sass().on('error', sass.logError))
      .pipe(prefix({
            browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
            cascade: false
        }))
      .pipe(gulp.dest('public/css'));
  browserSync.reload();
});

// Scripts and Minify JS
gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('public/js'));
  browserSync.reload();
});

// Browser Sync
gulp.task('browser-sync', ['sass', 'copyhtml', 'imagemin', 'scripts', 'copycss'], function(){
  browserSync({
    server: {
      baseDir: 'public'
    }
  });
});

// Watch Configuration
gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/img/*', ['imagemin']);
  gulp.watch('src/sass/*.sass', ['sass']);
  gulp.watch('src/*.html', ['copyhtml']);
  gulp.watch('src/*.css', ['copycss']);
});

// Run everything with 'gulp'
gulp.task('default', ['browser-sync', 'watch']);
