/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-30 13:17:26 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-01-30 17:11:44
 * DOM相关的方法封装
 */
var xingoeg1Dom = {
  printSon: function (father, grand) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-30 13:29:15 
     * 打印father下的所有子元素， 相当于node.children属性，但是兼容性更好
     * params : {father} 目标元素，获取该元素下的所有子元素
     * {返回值}: 子元素组成的数组
     */
    var childrens = ele.childNodes,
      len = childrens.length,
      arr = [];
    for (var i = 0; i < len; i++) {
      if (childrens[i].nodeType === 1) { //元素节点
        arr.push(childrens[i]);
        if (grand && childrens[i].childNodes.length > 1) {
          // 获取子孙节点
          arr.push(this.printSon(childrens[i], grand));
        }
      }
    }
    return arr;
  },
  getParent: function (target, num) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-30 13:21:38 
     * 获取target的元素的第num层祖先元素节点
     * params : {target} 目标元素
     * params : {num} number 第几层
     * {返回值}: 返回null，表示exceed（越界）
     */
    for (var i = 0; i < num; i++) {
      target = target === null ? null : target.parentElement;
    }
    return target;
  },
  getBrother: function (ele, n) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-30 13:18:05 
     * 返回元素e的第n个兄弟元素节点，n为正，返回后面的兄弟元素节点，n为负，返回前面的，n为0，返回自己
     * @params : {ele} variable 表示要获取的目标元素
     * @params : {n} number 表示要获取元素的第几个兄弟节点
     *           n > 0: 返回目标元素ele后边的兄弟节点
     *           n < 0: 返回目标元素ele前边的兄弟节点
     *           n = 0: 返回自身
     *           n值超范围: 返回null
     */
    /* 
    if (n > 0) {
      for (let i = 0; i < n; i++) {
        ele = ele == null ? null : ele.nextElementSibling;
      }
    } else if (n < 0) {
      for (let i = n; i < 0; i++) {
        ele = ele == null ? null : ele.previousElementSibling;
      }
    } 
    // 以上，兼容性不好
    */
    while (ele & n) {
      if (n > 0) {
        if (ele.nextElementSibling) {
          ele = ele.nextElementSibling;
        } else {
          /* 
          //思路 - 先看兄弟节点是不是元素
          ele = ele.nextSibling;
          if(ele.nodeType !== 1){
            // 如果不是元素节点，接着判断下一个
            ele = ele.nextSibling;
            if(...循环往复){}
          } */
          for (ele = ele.nextSibling; ele && ele.nodeType !== 1; ele = ele.nextSibling); //后边大括号不写值可以直接省略
        }
        n--;
      } else {
        if (ele.previousElementSibling) {
          ele.previousElementSibling;
        } else {
          for (ele = ele.previousSibling; ele && ele.nodeType !== 1; ele = ele.previousSibling);
        }
        n++;
      }
    }
    return ele;
  },
  myChildren: function (ele) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-30 15:30:01 
     * 获取该元素下的直接子节点（同printSon不传第二个参数时），解决以前部分浏览器的兼容性问题
     * params {ele} variable 目标元素
     */
    var child = ele.childNodes,
      len = child.length,
      arr = {
        length: 0,
        push: Array.prototype.push,
        splice: Array.prototype.splice
      };
    for (var i = 0; i < len; i++) {
      if (child[i].nodeType === 1) {
        arr.push(child[i]);
      }
    }
    return arr;
  },
  hasChildren: function (ele) {
    /*
     * @Author: @Guojufeng 
     * @Date: 2019-01-30 15:32:17 
     * 判断目标元素ele下是否有子元素
     * params {ele} variable 目标元素
     * @return true or false
     */
    var child = ele.childNodes,
      len = child.length,
      result = false;
    for (var i = 0; i < len; i++) {
      if (child[i].nodeType === 1) {
        result = true;
      }
    }
    return result;
  },
}
/* 原型链编程 */
Element.prototype.insertAfter = function (target, site) {
  /*
   * @Author: @Guojufeng 
   * @Date: 2019-01-30 16:58:35 
   * 将target插入到site后边
   * @params {target} 要插入的目标元素
   * @params {target} 要插入目标元素的参照元素
   */
  var next = site.nextElementSibling;
  if (next == null) {
    this.insertBefore(target, next);
  } else {
    this.appendChild(target);
  }
}
Element.prototype.reverseEle = function () {
  /*
   * @Author: @Guojufeng 
   * @Date: 2019-01-30 16:59:27 
   * 将结构翻转
   */
  var list = this.childNodes,
    len = list.length - 1;
  for (var i = len; i > 0; i--) {
    if (list[i].nodeType === 1) {
      this.appendChild(this.removeChild(list[i]));
    }
  }
}