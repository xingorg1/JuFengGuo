/*
 * @Author: @Guojufeng 
 * @Date: 2018-12-29 18:11:32 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2018-12-29 19:48:15
 */
console.log('======字符串去重======');
// 1.切割成数组，然后数组去重
// 2.正则？去重
function es5(a,a,b){
  'use strict';
  console.log(arguments)
  // console.log(arguments.callee);
 
  var obj = {
    a: 1,
    b: 2,
    a: 3
  }
  console.log(obj)
}
es5(1,2,3)

var obj = {
  name: 'obj'
}
var name = 'window';
function test(){
  var name = 'scope';
  var age = 18;
  with(obj){
    console.log(name)
    console.log(age)
  }
}
test();

