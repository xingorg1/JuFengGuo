/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-09 17:21:54 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-09 17:30:54
 * 其他从网上摘抄的很好的工具
 */

var xingorg1Other = {
  floatObj: function () {
    // 如何解决js处理小数时精度不准的问题
    // 作者：qing_小诺 
    // 来源：CSDN 
    // 原文：https://blog.csdn.net/qq_33237207/article/details/82109352 
    // 版权声明：本文为博主原创文章，转载请附上博文链接！
    /*
     * 判断obj是否为一个整数
     */
    function isInteger(obj) {
      return Math.floor(obj) === obj
    }
    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    function toInteger(floatNum) {
      var ret = {
        times: 1,
        num: 0
      };
      if (isInteger(floatNum)) {
        ret.num = floatNum;
        return ret
      }
      var strfi = floatNum + '';
      var dotPos = strfi.indexOf('.');
      var len = strfi.substr(dotPos + 1).length;
      var times = Math.pow(10, len);
      var intNum = parseInt(floatNum * times + 0.5, 10);
      ret.times = times;
      ret.num = intNum;
      return ret
    }
    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    function operation(a, b, op) {
      var o1 = toInteger(a);
      var o2 = toInteger(b);
      var n1 = o1.num;
      var n2 = o2.num;
      var t1 = o1.times;
      var t2 = o2.times;
      var max = t1 > t2 ? t1 : t2;
      var result = null;
      switch (op) {
        case 'add':
          if (t1 === t2) { // 两个小数位数相同
            result = n1 + n2
          } else if (t1 > t2) { // o1 小数位 大于 o2
            result = n1 + n2 * (t1 / t2)
          } else { // o1 小数位 小于 o2
            result = n1 * (t2 / t1) + n2
          }
          return result / max;
        case 'subtract':
          if (t1 === t2) {
            result = n1 - n2
          } else if (t1 > t2) {
            result = n1 - n2 * (t1 / t2)
          } else {
            result = n1 * (t2 / t1) - n2
          }
          return result / max;
        case 'multiply':
          result = (n1 * n2) / (t1 * t2);
          return result;
        case 'divide':
          result = (n1 / n2) * (t2 / t1);
          return result
      }
    }

    // 加减乘除的四个接口
    function add(a, b) {
      // +
      return operation(a, b, 'add')
    }

    function subtract(a, b) {
      // -
      return operation(a, b, 'subtract')
    }

    function multiply(a, b) {
      // *
      return operation(a, b, 'multiply')
    }

    function divide(a, b) {
      // /
      return operation(a, b, 'divide')
    }

    // exports
    return {
      add: add,
      subtract: subtract,
      multiply: multiply,
      divide: divide
    }
  }

}