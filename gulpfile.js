const gulp = require("gulp"); // Подключаем Gulp
const browserSync = require("browser-sync").create();
const watch = require("gulp-watch");
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

// 🔥 **Таск для компиляции PUG (следит за всеми .pug-файлами)**
gulp.task("pug", function () {
    return gulp
        .src("./src/pug/pages/**/*.pug") // Берем все страницы
        .pipe(
            plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: "Pug",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(pug({ pretty: '\t' }))
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream());
});

// 🔥 **Таск для UI-компонентов**
gulp.task("pugUi", function () {
    return gulp
        .src("./src/pug/ui/**/*.pug")
        .pipe(
            plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: "Pug UI",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(pug({ pretty: '\t' }))
        .pipe(gulp.dest("./build/ui/"))
        .pipe(browserSync.stream());
});

// 🔥 **SCSS-компиляция**
gulp.task("scss", function () {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(
            plumber({
                errorHandler: notify.onError(function (err) {
                    return {
                        title: "Styles",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 4 versions"]
            })
        )
        .pipe(gcmq())
        .pipe(gulp.dest("./build/css/"))
        .pipe(browserSync.stream());
});

// 🔥 **Шрифты**
gulp.task("ttf2woff2", function () {
    return gulp.src(['./src/fonts/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(gulp.dest('build/fonts/'));
});

// 🔥 **Копирование изображений в webp**
gulp.task("copy:img", function () {
    return gulp.src("./src/img/**/*.*")
        .pipe(webp())
        .pipe(gulp.dest("./build/img/"));
});

// 🔥 **Копирование библиотек, JS, видео, шрифтов**
gulp.task("copy:libs", function () {
    return gulp.src("./src/libs/**/*.*").pipe(gulp.dest("./build/libs/"));
});
gulp.task("copy:js", function () {
    return gulp.src("./src/js/**/*.*").pipe(gulp.dest("./build/js/"));
});
gulp.task("copy:video", function () {
    return gulp.src("./src/video/**/*.*").pipe(gulp.dest("./build/video/"));
});
gulp.task("copy:fonts", function () {
    return gulp.src("./src/fonts/**/*.*").pipe(gulp.dest("./build/fonts/"));
});

// 🔥 **Очистка папки build**
gulp.task("clean:build", function () {
    return del("./build");
});

// 🔥 **Форматирование HTML**
gulp.task("html:prettify", function () {
    return gulp
        .src('build/**/*.html')
        .pipe(formatHtml())
        .pipe(gulp.dest('./build/'));
});

// 🔥 **Запуск локального сервера**
gulp.task("server", function () {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

// 🔥 **Правильное отслеживание всех PUG-файлов**
gulp.task("watch", function () {
    // 🔥 **Следим за SCSS**
    gulp.watch("./src/scss/**/*.scss", gulp.series("scss"));

    // 🔥 **Следим за изменениями в PUG-файлах (включая инклюды)**
    gulp.watch("./src/pug/**/*.pug", gulp.series("pug"));

    // 🔥 **Следим за UI-компонентами**
    gulp.watch("./src/pug/ui/**/*.pug", gulp.series("pugUi"));

    // 🔥 **Следим за изображениями, JS, видео, шрифтами**
    gulp.watch("./src/img/**/*.*", gulp.series("copy:img"));
    gulp.watch("./src/js/**/*.*", gulp.series("copy:js"));
    gulp.watch("./src/video/**/*.*", gulp.series("copy:video"));
    gulp.watch("./src/fonts/**/*.*", gulp.series("copy:fonts"));
    gulp.watch("./src/libs/**/*.*", gulp.series("copy:libs"));

    // 🔥 **Следим за файлами в `build` и перезагружаем браузер**
    gulp.watch(["./build/**/*.*"]).on("change", browserSync.reload);
});

// 🔥 **Запуск всей сборки**
gulp.task(
    "default",
    gulp.series(
        "clean:build",
        gulp.parallel("scss", "ttf2woff2", "pug", "pugUi", "copy:img", "copy:js", "copy:libs", "copy:video", "copy:fonts"),
        "html:prettify",
        gulp.parallel("server", "watch")
    )
);
