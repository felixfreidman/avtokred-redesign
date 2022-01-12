"use strict";

const gulp = require("gulp");

// Utilites
const del = require("del");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const run = require("run-sequence");
// const wait = require('gulp-wait');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const gulpInclude = require("gulp-include");
const buffer = require('vinyl-buffer');
// const newer = require('gulp-newer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

// Server
const server = require("browser-sync").create();
const reload = server.reload;

// Html
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");

// Styles
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const minify = require("gulp-csso");
const csscomb = require('gulp-csscomb');


// Images
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const spritesmith = require('gulp.spritesmith');

// Config
const config = require('./config.json');
const publicPath = config.build;

// Server
gulp.task("serve", function(done) {
  server.init(config.server);
  (done);
});

// Clean

gulp.task('clean', () => {
  return del(config.clean);
});

// HTML
gulp.task("html", function() {
  return gulp.src(config.src.html) 
    .pipe(plumber())
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest(config.build.html))
    .pipe(reload({stream: true}));
});

// Styles
gulp.task("style", function() {
  return gulp
		.src(config.src.style)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({
				sourceMap: true,
				errLogToConsole: true,
				includePaths: ["node_modules/"]
			}))
    .pipe(postcss([
      autoprefixer()
    ]))
		.pipe(csscomb())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.build.css))
		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest(config.build.css))
		.pipe(reload({ stream: true }));
});

// Scripts
gulp.task("js:copy", function () {
  return gulp.src(config.src.js.separate)
    .pipe(plumber())
    .pipe(gulpInclude({
        extensions: "js",
        hardFail: true,
        includePaths: [
          __dirname + "/node_modules",
        ]
    }))
    .pipe(gulp.dest(config.build.js))
    .pipe(reload({stream: true}));
});

gulp.task("js:plugins", function () {
  return gulp.src(config.src.js.plugins)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(gulpInclude({
        extensions: "js",
        hardFail: true,
        includePaths: [
          __dirname + "/node_modules",
        ]
    }))
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest(config.build.js))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename('plugins.min.js'))
    .pipe(gulp.dest(config.build.js))
    .pipe(reload({stream: true}));
});

gulp.task("js:components", function () {
  return gulp.src(config.src.js.components)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(gulpInclude({
        extensions: "js",
        hardFail: true,
        includePaths: [
          __dirname + "/node_modules",
        ]
    }))
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest(config.build.js))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(config.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('js', gulp.series('js:copy', 'js:plugins', 'js:components', function (done) {
   done();
}));

// Images
gulp.task("images:build", function () {
  return gulp
    .src(config.src.img, { base: config.build.imgBase }) 
    .pipe(buffer())
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
    ]))
 
    .pipe(gulp.dest(config.build.img))
    // .pipe(reload({stream: true}));
});

gulp.task("images:clean", () => {
  return del(config.build.img);
});

gulp.task('images:watch', gulp.series('images:clean', function() { 
  return gulp.series('images:build');
}));

gulp.task("webp", function () {
  return gulp.src(config.src.img, { base: config.src.imgBase })
    .pipe(buffer())
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest(config.build.img))
    .pipe(reload({stream: true}));
});

// Sprites
gulp.task("sprite:svg", function () {
  return gulp.src(config.src.sprite.svg)
    .pipe(buffer())
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.php"))
    .pipe(gulp.dest(config.build.sprites))
    .pipe(reload({stream: true}));
});

gulp.task("php", function() {
  return gulp.src(config.src.php)
  .pipe(plumber())
  .pipe(gulp.dest(config.build.php))
  .pipe(server.stream());
});

gulp.task("fonts", function () {
  return gulp.src(config.src.fonts)
    .pipe(gulp.dest(config.build.fonts))
    .pipe(reload({stream: true}));
});

gulp.task("fonts:clean", function() {
  return del.sync(config.build.fonts);
});

gulp.task('fonts:watch', gulp.series('fonts:clean', function() { 
  return gulp.series('fonts');
}));

gulp.task('watch', function() {
  gulp.watch(config.watch.html, gulp.series('html')); 
  gulp.watch(config.watch.php, gulp.series('php')); 
  gulp.watch(config.watch.style, gulp.series('style'));
  gulp.watch(config.watch.js.components, gulp.series('js:components'));
  gulp.watch(config.watch.js.plugins, gulp.series('js:plugins'));
  gulp.watch(config.watch.img, gulp.series('images:watch'));
  gulp.watch(config.watch.sprite.svg, gulp.series('sprite:svg'));
  // gulp.watch(config.watch.sprite.png, gulp.series('sprite:png'));
  gulp.watch(config.watch.fonts, gulp.series('fonts:watch'));

});

gulp.task("build", 
  gulp.series(
    "clean",
    "sprite:svg",
    gulp.parallel(
      // "sprite:png",
      // "html",
      "php",
      "style",
      "js",
      "images:build",
      "webp",
      "fonts"
    ),
    gulp.parallel(
        "watch",
        "serve",
    )
  )
);