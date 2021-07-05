  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')(); //实例化 方便调用 gulp-minify-css gulp-uglify 
  var open = require('open'); // 实例化open方法
  var app = {
    srcPath: 'src/', //开发目录
    devPath: 'build/', //生产目录
    prdPath: 'dist/' //发布目录（用于发布）
  };

  gulp.task('lib', function () { //为事件命名
    gulp.src('bower_comments/**/*.js') //复制项目所依赖的js(如：通过bower安装的angular.js)
      .pipe(gulp.dest(app.devPath + 'vendor')) //将文件黏贴到生产目录
      .pipe(gulp.dest(app.prdPath + 'vendor')) //将文件黏贴到发布目录
      .pipe($.connect.reload()); //监测文件改变后重新运行黏贴复制
  });

  gulp.task('html', function () {
    gulp.src(app.srcPath + '**/*.html') //复制开发目录下的所有html文件
      .pipe(gulp.dest(app.devPath)) //将文件黏贴到生产目录
      .pipe(gulp.dest(app.prdPath)) //将文件黏贴到发布目录
      .pipe($.connect.reload());
  });

  gulp.task('json', function () {
    gulp.src(app.srcPath + 'data/**/*.json') //复制开发目录下的所有json文件
      .pipe(gulp.dest(app.devPath + 'data'))
      .pipe(gulp.dest(app.prdPath + 'data'))
      .pipe($.connect.reload());
  });


  gulp.task('less', function () {
    gulp.src(app.srcPath + 'style/index.less')
      .pipe($.less()) //将less文件编译为css
      .pipe(gulp.dest(app.devPath + 'css')) //将编译后的css文件黏贴到生产目录
      .pipe($.minifyCss()) //用gulp-minify-css压缩css文件
      .pipe(gulp.dest(app.prdPath + 'css')) //
      .pipe($.connect.reload());
  });
  gulp.task('css', function () {
    gulp.src(app.srcPath + "style/*.css")
      .pipe(gulp.dest(app.prdPath + 'css'))
      .pipe(gulp.dest(app.devPath + "css"))
      .pipe($.connect.reload());
  });
  gulp.task('js', function () {
    gulp.src(app.srcPath + 'script/**/*.js')
      .pipe($.concat('index.js'))
      .pipe(gulp.dest(app.devPath + 'js'))
      .pipe($.uglify()) //用gulp-uglify压缩js文件
      .pipe(gulp.dest(app.prdPath + 'js'))
      .pipe($.connect.reload());
  });


  gulp.task('img', function () {
    gulp.src(app.srcPath + 'image/**/*')
      .pipe($.imagemin()) //通过 gulp-imagemin 压缩图片文件
      .pipe(gulp.dest(app.devPath + "image"))
      .pipe(gulp.dest(app.prdPath + 'image'))
      .pipe($.connect.reload());
  });

  gulp.task('build', ['img', 'less', 'js', 'html', 'lib', 'json', 'css']); //将多个命令整合为一个命令方便运行

  gulp.task('serve', ['build'], function () { //开启一个本地服务器，方便浏览调试
    $.connect.server({ //
      root: [app.prdPath], // 设置服务器根目录
      livereload: true, //启动服务，自动打开浏览器(低端浏览不支持)
      port: 1234 //定义本地浏览器端口号(不与其他端口冲突任意定义)
    });
    open('http://localhost:1234'); //打开本地服务器的主页
    gulp.watch(app.srcPath + 'script/**/*.js', ['js']); //监听js文件目录,文件改变重新启动 js 任务
    // gulp.watch('bower_comments/**/*',['lib']);       
    gulp.watch(app.srcPath + 'style/**/*.less', ['less']); //监听less文件目录,文件改变重新启动 less 任务
    gulp.watch(app.srcPath + '**/*.html', ['html']);
    gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
    gulp.watch(app.srcPath + 'image/**/*', ['img']);

  });

  gulp.task('clean', function () { //清除 生产目录 和发布目录的全部文件
    gulp.src([app.devPath, app.prdPath])
      .pipe($.clean())
  });

  gulp.task('default', ['serve']); //定义一个默认任务， 在命令行中只需要 输入 gulp  不需要 跟任务名