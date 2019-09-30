/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-20 23:11:59 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-20 23:35:26
 * es modules模块写法，定义一个 减法 功能
 */
/* 错误(❌)的写法 */
/* export default subduction = (a,b)=>{
  console.log(`计算${a} - ${b}的值：${a - b}`);
  return a - b;
}; */
var subduction = (a,b)=>{
  console.log(`计算${a} - ${b}的值：${a - b}`);
  return a - b;
};
export default subduction;
// 对应引入方式 import subduction from './subduction';