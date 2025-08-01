import browserSync from "browser-sync";
import { src, dest, watch, series } from "gulp";
import gulpPlumber from "gulp-plumber";
import less from "gulp-less";
import GulpPostCss from "gulp-postcss";
import autoprefixer from 'autoprefixer';
import GulpCleanCss from "gulp-clean-css";
import { deleteAsync } from 'del';

function clean() {
  return deleteAsync('less/**/*.css');
}

function styles() {
  return src('less/style.less')
    .pipe(gulpPlumber())
    .pipe(less())
    .pipe(GulpPostCss([
      autoprefixer()
    ]))
    .pipe(GulpCleanCss({ level: 2 }))
    .pipe(dest('css'))
    .pipe(browserSync.stream());
}

function server() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    cors: true,
    notify: false,
    open: true,
    ui: false
  });

  watch('index.html', browserSync.reload);
  watch('less/**/*.less', styles);
}

export default series(clean, styles, server);
