/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-18 17:51:36 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-18 19:10:26
 * 模块2
 */
define(function(require,exports,module){
  var myName = 'module-2';
  function getName(){
    console.log(myName)
    return myName;
  }
  // 第二种接口暴露方法，exports是一个空对象，上边有个m2属性被暴露出去.
  exports.m2 = getName;
})