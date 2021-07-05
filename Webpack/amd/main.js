/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-16 21:09:00 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-18 16:43:46
 * 入口js文件
 */
(function () {
  console.log('入口js');
  require.config({
    // 配置当前每一个变量对应模块的路径
    // baseUrl: './modules/',
    paths: {
      // m1: './modules/m1',//注意：这么引入是错的，因为我在m1文件中给m1模块define的时候填了第一个id参数，作用是给这个模块命名了，所以这里引入的时候还得用那个相同的id名字。
      myModules: './modules/m1',
      m2: './modules/m2', //m2模块没有定义id名，可以用id名字
      module03: './modules/m3', //m2模块没有定义id名，可以用id名字
      // jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min'
      // jquery在源码中定义了AMD模式时，模块的名字为小写jquery，换其他名字不好使
      jquery: './libs/jquery.min' //用了baseUrl后，因为jquery和另外两个模块地址不同，所以也会使用baseUrl
    }
  });
  // require(['m1','m2','jquery'],function(m1,m2,$){//同理，这里数组处引入时，名字应该和config里保持一致。m1应该叫myModules
  require(['myModules', 'm2', 'jquery'], function (m1, m2, $) {
    // 检测模块引入成功
    console.log('m1', m1)
    console.log('m2', m2)
    console.log('jquery', $);
    // 使用模块
    m1.getName()
    var rst2 = m2.sayMyName(1, 2);
    console.log(rst2)
    $('body').css('backgroundColor', '#afe');
  });
})(); //立即执行函数-执行其中代码

/* // 主入口文件 - 模块引入
(function () {
  console.log('入口js');
  // 配置当前每一个变量对应模块的路径
  require.config({
    // baseUrl: './modules/',//注1
    paths: {
      myModules: './modules/m1',//注2
      m2: './modules/m2',//注3
      jquery: './libs/jquery.min'//注4
    }
  });
  // 引入模块
  require(['myModules', 'm2', 'jquery'], function (m1, m2, $) {//注5
    // 检测模块引入成功
    console.log('m1', m1)
    console.log('m2', m2)
    console.log('jquery', $);
    // 使用模块
    m1.getName()
    var rst2 = m2.sayMyName(1, 2);
    console.log(rst2)
    $('body').css('backgroundColor', '#afe');
  });
})(); //立即执行函数-执行其中代码 */