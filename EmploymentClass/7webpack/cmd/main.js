/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-18 16:47:02 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-18 19:12:59
 * 主入口文件
 */
console.log('main.js');
define(function(require,exports,module) {
  var m1Id = require('./modules/m1');
  var modules02 = require('./modules/m2');
  // var m3Id = require('./modules/m3');
  /* 异步加载 */
  require.async('./modules/m3', function(m3) {
    console.log('===异步===',m3);
    m3.foo();
  });
  var m4Id = require('./modules/m4');
  console.log(m1Id,modules02,m4Id)
  m1Id.getName();
  modules02.m2();
});
