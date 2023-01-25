const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync");
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");

const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  scss: {
    src: 'src/sass/**/*.+(scss|sass|css)',
    dest: 'dist/css',
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dest: 'dist/fonts'
  }
}

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: paths.html.dest,
    },
  });

  gulp.watch(paths.html.src).on("change", browserSync.reload);
});


gulp.task("watch", function () {
  gulp.watch(paths.scss.src, gulp.parallel("styles"));
  gulp.watch(paths.html.src).on("change", gulp.parallel("html"));
});

gulp.task("styles", function () {
  return gulp
    .src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(rename("style.css"))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ basename: "style", suffix: ".min"}))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
});

gulp.task("html", function () {
  return gulp
    .src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(paths.html.dest));
});

gulp.task("images", function () {
  return gulp.src("src/img/**/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
});

gulp.task("fonts", function () {
  return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

// gulp.task("scripts", function () {
//   return gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js"));
// });

// gulp.task("icons", function () {
//   return gulp.src("src/icons/**/*").pipe(gulp.dest("dist/icons"));
// });


gulp.task(
  "default",
  gulp.parallel(
    "server",
    "watch",
    "styles",
    "html",
    "images",
    "fonts"
  )
);
