// /*
//  * @Author: @Guojufeng 
//  * @Date: 2019-06-19 20:36:21 
//  * @Last Modified by: @Guojufeng
//  * @Last Modified time: 2019-06-19 20:57:05
//  */
// const path = require('path');

// module.exports = {//导出一个对象
//   productionSourceMap: false,//是否打包sourceMap文件
//   // 给dist文件夹起个别名
//   outputDir: './myDist',//设置输出目录
//   // 设置打包后静态资源的根目录
//   publicPath: process.env.NODE_ENV === 'production' ? 'https:www.baidu.com' : './',//根据环境变量改变
//   // 设置静态资源路径
//   assetsDir: 'assets',//将所有静态资源放入assets地址中
//   // 获取webpack的配置
//   chainwebpack: (config)=>{
//     // config就相当于外边被module.exports的对象，可以利用config给webpack增加配置
//     // 脚手架生成的项目中，@表示src文件夹 ：@is an alias to /src，我们可以用config改
//     config.resolve.alias.set('_v',path.resolve(__dirname,'src/views'));//这样就把src/views路径改成_v别名了。
//   },
//   // 设置代理
//   devServer:{
//     proxy: {
//       '/api/chat/sendMsg': {
//         // 当访问'/api/chat/sendMsg'这个接口时，会走到这代理里边，代理配置了这个接口，指明让其指向target所对应的地址
//         // 代理可以帮助我们跨域，代理是服务器，服务器之间没有跨域这一说。
//         target: 'https:www.baidu.com'
//       }
//     }
//   },
//   // 配置webpack,和正常写webpack一样的。
//   configureWebpack:{
//     plugin:[],
//     module: {}
//   },
//   // 配置工具编译pug、sass、less等语言：需要先安装、再配置。
//   // vue add style-resources-loader。安装完后vue.config.js中会多出如下内容
//   // 用于抽离css为公用的样式文件,注入到全局
//   /* pluginOptions: {
//     'style-resources-loader':{
//       preProcessor: 'less',//取决于你安装的是啥
//       patterns:[
//         // 配置要注入的文件路径
//         path.resolve(__dirname,'src/assets/style/main.less')
//       ]
//     }
//   } */
// }