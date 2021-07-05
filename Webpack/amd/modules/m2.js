/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-17 09:53:25 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-18 16:44:13
 * 我的第二个AMD模块
 */
define(['myModules','module03'], function(m1,m3) {
  /* 参数解析
    1.第一个参数未填，表示没有定义模块名，所以该模块名默认就是m2文件名
    2.['myModules']表示依赖的其他模块的id（或文件名：当没有定义模块名时使用）的集合
    3.function ，形参就是变量，m1就是拿到的模块m1
   */
  // 回调里边放主内容：
  var name = '我的第二个AMD模块';
  function sayMyName(a,b){
    m1.getName();//使用引入的模块
    console.log('a+b=',a+b);
    return name;
  }
  console.log(m3)
  //最后return - 暴露接口
  return {sayMyName};
});