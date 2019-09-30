/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-18 17:55:04 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-18 19:12:32
 * m3模块
 */

define(function(require,exports,module){
  var name = 'module3';
  var foo = function(){
    console.log('i am'+name+';异步执行，最后打印~')
    return '随便玩';
  }
  exports.foo = foo;
});