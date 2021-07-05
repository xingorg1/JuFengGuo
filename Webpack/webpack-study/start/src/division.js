/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-20 23:38:39 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-20 23:39:36
 * 除法模块，利用commonJs实现模块化，暴露接口
 */
exports.division = function(a,b){
  console.log(`计算${a} / ${b}的值：${a / b}`);
  return a / b;
}