let project_folder = "dist";

let source_folder = "#src";

let path = {
    build:{
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
        video: project_folder + "/video/",
    },
    src:{
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{svg,png,jpg,jpeg}",
        fonts: source_folder + "/fonts/*.ttf",
        video: source_folder + "/video/*mp4",
        recapcha: "node-modules/react-google-recaptcha/src/recaptcha.js",
    },
    watch:{
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{svg,png,jpg,jpeg}",
    },
    clean:"./" + project_folder + "/"
}

let {src, dest}= require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass")(require('sass')),
    autoprefixer = require("gulp-autoprefixer"),
    group_media= require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    //imagemin = require("gulp-imagemin"),
    ghPages = require('gulp-gh-pages'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat');

function browserSync() {
    browsersync.init({
        server:{
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false,
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
            outputStyle: "expanded"
        })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

// function libsJS() {
//     return src([
//         'node_modules/react-google-recaptcha/src/recaptcha.js',
//     ])
//         .pipe(concat('libs.min.jsx'))
//         .pipe(dest("#src/jsx/"))
//         .pipe(dest(path.build.js));
// }

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     interlaced: true,
        //     optimizationLevel: 3
        // }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function video() {
    return src(path.src.video)
        .pipe(dest(path.build.video))
        .pipe(src(path.src.video))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([source_folder + "/jsx/**/*.jsx"], babelJs);
}

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

function babelJs() {
    return gulp.src(source_folder + "/jsx/**/*.jsx").
        pipe(babel({
            plugins: ['transform-react-jsx']
        })).
        pipe(gulp.dest(source_folder + "/js/"));
};

function clean() {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, video, babelJs));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.babelJs = babelJs;
exports.video = video;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;