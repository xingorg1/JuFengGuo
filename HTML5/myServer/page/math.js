/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-29 16:25:17 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-29 16:28:37
 * math.js - 为worker而生
 */
console.log('呵呵哈哈哈',Math.random() * 10)
function add(a,b){
  a = parseInt(Math.random() * a);
  b = parseInt(Math.random() * b);
  return a + b;
}