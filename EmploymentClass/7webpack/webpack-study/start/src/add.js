/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-20 23:06:09 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-20 23:28:59
 * add功能模块，利用es6的模块写法抛出一个求和函数
 */
export function add(a,b){
  console.log(`计算${a}+${b}的值：${a+b}`);
  return a + b;
}
// 对应引入方式 import {add} from './add';
