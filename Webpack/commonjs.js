// m1文件
module.exports = {
  a: 1,
  foo: function(){
    return '第一种抛出方法'
  }
}
// m2文件
module.exports = function(){
  return "第三种抛出方法"
}
// m3文件
exports.foo = function(){
  return '第二种抛出方法'
}

var m1 = require('../jsName');
var m2 = require('../../jsName');
var m3 = require('../jsName');

// 要想获得返回值，得对应的这么操作：
m1.foo();
m2();
m3();