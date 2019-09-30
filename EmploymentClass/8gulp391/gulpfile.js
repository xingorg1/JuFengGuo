/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-29 16:44:09 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-30 16:47:20
 */
var gulp = require("gulp"),
  /* 安装插件 */
  // css相关插件
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"), //加前缀
  cssnano = require("cssnano"), //压缩
  // js相关
  uglify = require("gulp-uglify"), //压缩
  stripDebug = require("gulp-strip-debug"), //过滤console等
  // 图片相关
  imagemin = require("gulp-imagemin"), //压缩图片
  base64 = require('gulp-base64'), //- 把小图片转成base64字符串
  // pug相关插件
  rename = require('gulp-rename'),
  pug = require('gulp-pug'),
  // sass相关插件
  sass = require('gulp-sass'),
  // 本地服务配置
  connect = require("gulp-connect"),
  // 开启浏览器
  open = require('gulp-open'),
  browserSync = require('browser-sync').create(), //开启本地服务和热更新
  /* 统一管理所有的路径地址 */
  folderUrl = {
    src: "src/",
    dist: "dist/"
  };
/* 处理html */
gulp.task("html", function () {
  gulp.src(folderUrl.src + "html/*.html")
    .pipe(connect.reload())
    .pipe(gulp.dest(folderUrl.dist + "html/"))
    .pipe(browserSync.reload({
      stream: true
    }))
})
/* 处理pug */
gulp.task("pug", function () {
  gulp.src(folderUrl.src + "pug/*.pug")
    .pipe(rename(function (path) {// 切割pug名字，为的是团队开发的时候，pug命名为gjfName_fileName.pug这种情况，把作者名字切掉。
      var filename = path.basename.split('_')[1];
      if (!filename) {
        return path;
      }
      path.basename = filename;
      return path;
    }))
    // 执行pug任务
    .pipe(pug({
      // Your options in here.
      pretty: true
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest(folderUrl.dist + "html/")) //输出
    .pipe(browserSync.reload({//监听热更新
      stream: true
    }))
})
/* 处理css */
gulp.task("css", function () {
  var options = [autoprefixer(), cssnano()];
  gulp.src(folderUrl.src + "css/*.css")
    .pipe(connect.reload())
    .pipe(postcss(options))
    .pipe(gulp.dest(folderUrl.dist + "css/"))
    .pipe(browserSync.reload({
      stream: true
    }))
});
/* 处理sass */
sass.compiler = require('node-sass');
gulp.task("sass", function () {
  gulp.src(folderUrl.src + "scss/*")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(folderUrl.dist + "css/"))
    .pipe(browserSync.reload({
      stream: true
    }))
});
/* 处理js */
gulp.task("js", function () {
  gulp.src(folderUrl.src + "js/*")
    .pipe(connect.reload())
    // .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(folderUrl.dist + "js/"))
    .pipe(browserSync.reload({
      stream: true
    }))
});
/* 处理img */
gulp.task("img", function () {
  gulp.src(folderUrl.src + "img/*")
    .pipe(connect.reload())
    .pipe(base64())
    .pipe(imagemin())
    .pipe(gulp.dest(folderUrl.dist + "img/"))
    .pipe(browserSync.reload({
      stream: true
    }))
});
/* 监听静态资源变化 */
/* gulp.task("watch", function () {
  //四行的意思：监听对应路径下html文件夹中的的所有文件，并执行html这个task任务
  gulp.watch(folderUrl.src + "html/*", ["html"]);
  gulp.watch(folderUrl.src + "css/*", ["css"]);
  gulp.watch(folderUrl.src + "js/*", ["js"]);
  gulp.watch(folderUrl.src + "images/*", ["images"]);
}); */
/* 开启本地服务 */
/* gulp.task("server", function () {
  connect.server({
    port: "8081", // 端口号
    // root: './dist/html',// 设置根目录
    livereload: true
  });
}); */

// 打开浏览器
// gulp.task('open', function(){
//   gulp.src('folderUrl.src + "html/*html.html"')
//     .pipe(open());
// });

/* 开启本地服务 + 打开浏览器*/
gulp.task('hot:dev', function () {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: `./dist`
    }
  });
  gulp.watch(`./src/html/*.html`, ['html']);
  gulp.watch(`./src/pug/*.pug`, ['pug']);
  gulp.watch(`./src/css/*.css`, ['css']);
  gulp.watch(`./src/js/*.js`, ['js']);
  gulp.watch(`./src/img/*`, ['img']);
});
/* 配置默认任务 */
gulp.task("default", ["html", "css", "js", "img","pug","sass","hot:dev"], function () {
  console.log(folderUrl.src, folderUrl.dist)
});