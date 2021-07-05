var postcss = require('postcss');
var postcssPresetEnv = require('postcss-preset-env');
module.exports = {
  loader: 'postcss-loader',
  options: { //添加postcss插件的配置，
    ident: 'postcss', //插件的使用是针对postcss的
    plugins: [ //规定接下来使用的插件
      // postcssPresetEnv.process('./src/css/*.css', {
      //   /* pluginOptions */
      //   stage: 3,
      //   features: {
      //     'nesting-rules': true
      //   },
      //   autoprefixer: {
      //     grid: true
      //   }
      // }),
      //上边这种先定义变量后调用的方法和下边直接引入并调用一致。
      require('postcss-cssnext')(), //解析cssNext的语法，已被弃用deprecated，转用postcss-preset-env
      // * postcss-cssnext里边包含了autoprefixer的功能，同时存在时，只需要cssnext这个插件就行了，autoprefixer可以注释掉，要不有的时候脚手架可能会报错。
      // require('autoprefixer')(), //引入一个插件-作用是自动添加前缀 同样用了postcss-preset-Env就不需要这个了
      require('cssnano')(), //引入一个插件-作用是压缩css文件
      require('postcss-pxtorem')({//px转rem 
        rootValue: 75, // 对根元素大小进行设置
        unitPrecision: 2, // 转换成rem后保留小数点位数
        propList: ['*','!border'], // 存储将被转换的属性列表。*表示全部，!border表示排除带有border的属性
        selectorBlackList: [],//是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，
        replace: true,
        mediaQuery: false,
        minPixelValue: 2 //所有小于2px的样式都不被转换.
      }),
      require('postcss-sprites')() // 雪碧图
    ]
  }
}