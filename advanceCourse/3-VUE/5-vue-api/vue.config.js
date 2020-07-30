// const vuxLoader = require('vux-loader')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  chainWebpack: config => {
    // 解决不能用jsx的问题
    config.module
      .rule('thejs')
      .test(/\.js$/)
      .include
        .add(path.resolve('src'))
        .add(path.resolve('node_modules/element-ui/packages'))
        .end()
      .use('babel-loader')
        .loader('babel-loader')
        .end()
  },
  // devServer:{
  //   disableHockCheck: true,
  //   post: '80',
  //   host: 'gjf.vue-study.com'
  // },
  configureWebpack: config => {
    devtool: 'source-map'
    // vuxLoader.merge(config, {
    //   plugins: [{
    //     name: 'vux-ui'
    //   },
    //   {
    //     name: 'duplicate-style' //构建重复css代码
    //   }]
    // })
  }
}