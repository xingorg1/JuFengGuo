/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-25 19:58:12 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-28 21:08:09
 */
var path = require('path'); //引入node接口 - 路径
// var glob = require('glob');//glob变量
var glob = require('glob-all'); //glob变量
var HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件
var MiniCssExtractPlugin = require('mini-css-extract-plugin'); //引入插件,用法见github,用于单独抽离css文件
var PurifyCSSPlugin = require('purifycss-webpack');
var WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default; //引入插件,用法见github
var postcss = require('postcss');
var postcssPresetEnv = require('postcss-preset-env');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var postCssConf = require('./postcss.config');
var webpack = require('webpack');

var config = {
  devServer: {
    port: '9091',//修改端口号
    contentBase: 'dist',//默认打开路径
    hot: true,//开启webpack的热更新
  },
  mode: 'development', //开发环境，不压缩出口文件
  entry: {
    index: './src/js/index.js' //入口文件路径
  },
  output: {
    path: path.resolve(__dirname, 'dist'), //另一种写法__dirname + '/dist/,输出文件的地址，当前配置文件目录下的dist文件夹下
    filename: '[name][hash:5].min.js' //输出的文件名以入口文件名为主，并且加上.min、hash值
  },
  module: {
    rules: [{
        test: /\.css$/,
        // use: ['style-loader','css-loader']//加载处理css的loader，因为除了js文件以外，webpack都要依赖loader才能处理文件
        use: [
          MiniCssExtractPlugin.loader, //单独抽离css文件和解析的行间样式style-loader是不能在一起的。所以改成这样
          'css-loader',
          postCssConf // 引入postcss设置并使用
        ]
      },
      {
        test: /\.scss$/,
        use: [ //use的第二种写法,一般用于loader有单独的配置项的时候。
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        /* 处理图片，当大小在范围之内时，图片转换成Base64编码，否则将使用file-loader引入 */
        test: /\.(png|jpg|gif|jpeg)$/i,
        // use: ['url-loader?limit=8192&name=./[name].[ext]']},// 一种写法
        // use: 'url-loader?limit=1024&name=[path][name].[ext]&outputPath=img/&publicPath=output/',
        use: [{
          /* 抽离图片 */
          loader: 'url-loader',
          options: {
            limit: 10000, // limit=10000表示将所有小于10kb的图片都转为base64形式（为什么呢？因为一个很小的图片，不值当的去发送一个请求，减少请求次数。）
            // （其实应该说超过10kb的才使用 url-loader 来映射到文件，否则转为dataurl形式）
            name: '[name][hash:5].[ext]', //ext表示对应后缀[扩展名]。保证输出的图片名称与之前命名的图片名称保持一致
            outputPath: 'img/',
            // publicPath: ''
          }
        },{
          /* 压缩图片 */
          loader: 'img-loader',
          options: {
            // 针对不同类型的图片，需要传入不同的参数，具体配置见npmjs和github的img-loader文档
            plugins: [
              require('imagemin-pngquant')({
                quality: [0.3,0.5]//表示压缩的质量，接受一个数组，里边的项介于0-1之间。
              })
            ]
          }
        }]
      },
      {
        test: /\.html$/,
        // 处理html源文件，包括html中图片路径加载、监听html文件改变重新编译等
        use: [{
          loader: 'html-loader',
          options: {
            attr: ['img:src'],//设置处理的内容，是img标签的src属性引入过来的文件
            // minimize: true,
            // removeComments: false,
            // collapseWhitespace: false //去掉空格
          }
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    }),
    /* new PurifyCSSPlugin({// 不起作用
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync([
        path.join(__dirname, './*.html'),
        path.join(__dirname, './src/js/*.js')//检测js中动态加的html结构和css样式，不过滤他们的代码
      ])//匹配路径，所有根目录下src文件夹中以html结尾的。
    }),/ /css tree shaking要放在js tree shaking的上边*/
    new HtmlWebpackPlugin({
      filename: 'index.html', //配置生成的html文件名字及目录，dist为根目录
      template: './index.html', //配置生成的html以哪个html文件为模板，设置了以这个为模板后，title就不起作用了
      title: 'html-webpack-plugin生成title', //配置生成html的title
      minify: { //压缩、整理文件
        removeComments: true, //清理注释
        collapseWhitespace: true, // 清理空格、压缩
        // 更多配置见官方文档
      }
    }),
    new WebpackDeepScopeAnalysisPlugin(), // js-tree-shaking插件
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
module.exports = config;