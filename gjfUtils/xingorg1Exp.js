/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-26 11:55:02 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-01-26 14:20:51
 * 正则方法库
 * 说明：所有的方法，如果传进来字符串，就帮你做计算（验证/替换/截取），如果不传入字符串，则直接返回给你正则表达式，供你自己操作使用。
 */
var xingorg1Exp = {
  /* 验证 - test */
  isPureNum : function(str){
    /* 
     * @Author: @Guojufeng 
     * @Date: 2019-01-26 11:55:02
     * 是否是纯数字 
     * @params { str }: string, 要截取的字符串
    */
    var reg = /\d+$/g;
    return str === undefined ? reg : str.match(reg);
    //解释：\d匹配一个数字，+匹配一个或多个数字，$要求这个数字是结尾
  },
  /* 获取 - match */ 
  getLastNum : function(str){
    /* 
     * @Author: @Guojufeng 
     * @Date: 2019-01-26 11:55:02
     * 获取字符串结尾处的数字
     * @params { str }: string, 要截取的字符串
    */
    var reg = /\d+$/g;
    return str === undefined ? reg : str.match(reg);
    //解释：\d匹配一个数字，+匹配一个或多个数字，$要求这个数字是结尾
  },

  /* 替换 - replace */
  
}
