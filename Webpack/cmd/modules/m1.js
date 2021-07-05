/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-18 17:32:41 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-18 19:10:35
 * 模块1
 */
define(function(require,exports,module){
  var myName = 'module-1';
  function getName(){
    console.log(myName)
    return myName;
  }
  // 第一种暴露方法，
  module.exports = {
    getName
  }
})