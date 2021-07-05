
// 输入define直接按回车就有了
define(moduleId,[
  'require',
  'dependency'
], function(require, factory) {
  'use strict';
  return {}
});
// 加载模块
require.config({
  // 配置每一个模块变量对应的路径
  baseUrl: "../js/lib",//直接改变基目录（baseUrl）。
  paths:{
    dependency: '../js/lib/dependency.js',
    dependency2: 'dependency2',//不用写js后缀
    //如果某个模块在另一台主机上，也可以直接指定它的网址，比如：
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',//
  }
})
require(['dependency','jquery'],function(depName,$){
  $('body').css('backgroundColor','#000');
});
