/*
 * @Author: @Guojufeng 
 * @Date: 2019-06-24 00:21:57 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-24 00:59:23
 */
const {log} = console;
function MyVue(el,data){
  this.el = this.originEL = el;
  this.data = data;
  // let mustache = analysis(this.el.innerHTML);
  // let keyArr = getKey(mustache);
  render({
    originEL: this.originEL,
    el: this.el,
    data: this.data,
    // keyArr
  });
}
function analysis(html){
  // 2、analysis（解析模板）然后从dom中检测符号的位置和符号中的变量名，
  return (html+'').match(/{{(\w+)}}/g);
}
function getKey(mustache){
  // 2+1,把从innerHTML这段dom字符串中获取的插值表达式变量的左右大括号取到
  return (mustache+'').match(/\w+/g);
}
function render(params){
  // 3、将dom字符串中的变量名替换为数据值
  let str = params.originEL.innerHTML,
  reg = /{{(\w+)}}/g;
  // 用replace，可以省略analysis和getKey两步，因为通过正则可以匹配到dom字符串中的大括号表示（e表示），通过正则表达式的子表达式(\w+)这里，还能拿到双大括号内部的变量名（$1表示）。替换后的字符串就是replace的返回值，用变量rst存储。
  let rst = str.replace(reg,(e,$1)=>{
    log(e,$1);
    let rst = params.data[$1];
    return rst
  });
  params.el.innerHTML = rst;
}