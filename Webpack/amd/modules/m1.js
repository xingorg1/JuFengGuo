/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-16 21:09:31 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-17 10:39:44
 * 模块m1js
 */
define('myModules', function () {
  // myModules表示当前模块的id，别人引入m1时，对应的名字就必须是这个。
  var name = '我的第一个AMD文件';
  var obj = {
    name
  }
  console.log(name);//引入后是立即执行的。这也就是依赖前置
  function getName() {
    name += '!';
    console.log(name);
    return name;
  }
  return {getName}
  // 因为返回的是一个对象，对象中属性名如果和属性值相同，那么可以不写属性值。
  // 相当于下边这种写法
  return {
    getName: getName
  }
});