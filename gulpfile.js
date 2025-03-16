const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const del = require("del");
const gcmq = require("gulp-group-css-media-queries");
const formatHtml = require('gulp-format-html');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const ttf2woff2 = require('gulp-ttf2woff2');

// Очистка папки build
gulp.task("clean:build", function () {
    return del("./build");
});

// Компиляция PUG
gulp.task("pug", function () {
    return gulp
        .src("./src/pug/pages/**/*.pug", { since: gulp.lastRun("pug") })
        .pipe(plumber({ errorHandler: notify.onError({ title: "Pug", message: "<%= error.message %>" }) }))
        .pipe(pug({ pretty: '\t' }))
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream());
});

// Компиляция PUG UI-компонентов
gulp.task("pugUi", function () {
    return gulp
        .src("./src/pug/ui/**/*.pug", { since: gulp.lastRun("pugUi") })
        .pipe(plumber({ errorHandler: notify.onError({ title: "Pug UI", message: "<%= error.message %>" }) }))
        .pipe(pug({ pretty: '\t' }))
        .pipe(gulp.dest("./build/ui/"))
        .pipe(browserSync.stream());
});

// Компиляция SCSS
gulp.task("scss", function () {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(plumber({ errorHandler: notify.onError({ title: "Styles", message: "<%= error.message %>" }) }))
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["last 4 versions"] }))
        .pipe(gcmq())
        .pipe(gulp.dest("./build/css/"))
        .pipe(browserSync.stream());
});

// Шрифты
gulp.task("ttf2woff2", function () {
    return gulp.src("./src/fonts/*.ttf")
        .pipe(ttf2woff2())
        .pipe(gulp.dest("build/fonts/"));
});

// Копирование изображений в webp
gulp.task("copy:img", function () {
    return gulp.src("./src/img/**/*.*")
        .pipe(webp())
        .pipe(gulp.dest("./build/img/"));
});

// Копирование файлов
gulp.task("copy:js", () => gulp.src("./src/js/**/*.*").pipe(gulp.dest("./build/js/")));
gulp.task("copy:video", () => gulp.src("./src/video/**/*.*").pipe(gulp.dest("./build/video/")));
gulp.task("copy:fonts", () => gulp.src("./src/fonts/**/*.*").pipe(gulp.dest("./build/fonts/")));
gulp.task("copy:libs", () => gulp.src("./src/libs/**/*.*").pipe(gulp.dest("./build/libs/")));

// Форматирование HTML
gulp.task("html:prettify", function () {
    return gulp
        .src("build/**/*.html")
        .pipe(formatHtml())
        .pipe(gulp.dest("./build/"));
});

// Запуск локального сервера
gulp.task("server", function () {
    browserSync.init({
        server: { baseDir: "./build/" }
    });
});

// Наблюдение за изменениями
gulp.task("watch", function () {
    gulp.watch("./src/scss/**/*.scss", gulp.series("scss")); // SCSS
    gulp.watch("./src/pug/**/*.pug", gulp.series("pug")); // Pug
    gulp.watch("./src/pug/ui/**/*.pug", gulp.series("pugUi")); // UI-компоненты
    gulp.watch("./src/js/**/*.js", gulp.series("copy:js", browserSync.reload)); // JS с перезагрузкой
    gulp.watch("./src/img/**/*.*", gulp.series("copy:img")); // Изображения
    gulp.watch("./src/video/**/*.*", gulp.series("copy:video")); // Видео
    gulp.watch("./src/fonts/**/*.*", gulp.series("copy:fonts")); // Шрифты
});

// Запуск сборки
gulp.task("default", gulp.series(
    "clean:build", // Очистка перед стартом
    gulp.parallel("scss", "ttf2woff2", "pug", "pugUi", "copy:img", "copy:js", "copy:libs", "copy:video", "copy:fonts"),
    "html:prettify",
    gulp.parallel("server", "watch")
));
