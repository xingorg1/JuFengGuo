// const vuxLoader = require('vux-loader')

module.exports = {
  publicPath: './',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: config => {
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