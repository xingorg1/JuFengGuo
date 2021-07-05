/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-25 15:08:41 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-25 19:26:19
 * 模块打包默认使用配置文件
 * 有了配置文件，直接执行webpack即可按照配置执行
 */
var path = require('path');//node的api，使用commonJs语法引入进来
/* module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname,'dist/js'),
    filename: '[name].min.[hash:7].js'
  }
} */
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
// 多文件打包
module.exports = {
  mode: 'development',
  entry: {
    /* 入口 */
    index: './src/js/index.js', // 定义入口js文件
    index2: './src/js/index2.js', // 可以设置多个入口文件
  },
  output: {
    /* 出口 */
    path: path.resolve(__dirname,'dist'),//__dirname表示当前文件所在的目录
    // filename: '[name].min.[hash:7].js' // 给打包后的文件名带版本号的形式
    filename: '[name].min.js' //定义输出的文件及名字
  },
  module:{
    /* loader加载器 */
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader','sass-loader'] // webpack 规则：放在最后的 loader 首先被执行。也就是说其执行顺序是倒序的。
      }
    ]
  },
  plugins :[
    /* 插件 */
    new HtmlWebpackPlugin()//插件字典地址：https://www.webpackjs.com/plugins/
  ]
}