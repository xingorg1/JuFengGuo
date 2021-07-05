/*
 * @Author: @Guojufeng 
 * @Date: 2019-06-24 00:21:57 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-28 18:57:12
 */
const {
  log
} = console;

function deepClone(data) {
  // 复杂点的深度克隆
  let rst;
  if (data === null) {
    return data;
  }
  if (typeof data === 'object') {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      rst = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          rst[key] = deepClone(data[key]);
        }
      }
    } else {
      // 数组
      rst = [];
      data.forEach(element => {
        rst.push(deepClone(element))
      });
    }
  } else {
    rst = data;
  }
  return rst;
}

// vm:将dom字符串中的变量名替换为数据值
function MyVue(el,data) {
  this.el = el;
  this.originEL = el.innerHTML;
  this.data = data;
  /* 做模板和节点之间的映射map,key就是模板，value就是数组，每一项都是用到模板的节点 */
  this.mapping = new Map();
  // 获取根节点应该在渲染之前
  this.vNodeRoot = buildVNode.call(this,this.el);
  render({
    originEL: this.originEL,
    el: this.el,
    data: this.data
  });
  this.ProxyData(data);
}
MyVue.prototype.ProxyData = function(copyData){
  /* 监听数据变化 - 函数 */
  let _this = this;
  if (copyData && typeof copyData == 'object') {
    for (let key in copyData) {
      if (copyData.hasOwnProperty(key)) {
        let val = copyData[key];
        this.ProxyData(val);
        Object.defineProperty(copyData, key, {
          get() {
            log('getter：' + key);
            return val;
          },
          set(value) {
            log(`setter：${key}、value：${value}`)
            val = value;
            render({
              originEL: _this.originEL,
              el: _this.el,
              data: copyData
            });
          }
        });
      }
    }
  } else {
    return copyData;
  }
}

function render(params) {
  let str = params.originEL,
    reg = /{{(\w+)}}/g;
  // 用replace通过正则可以匹配到dom字符串中的大括号表示（e表示），有几个插值表达式replace执行几次。
  let rst = str.replace(reg, (e, $1) => {
    // 通过正则表达式的子表达式(\w+)这里，还能拿到双大括号内部的变量名（$1表示）。
    let rst = params.data[$1];
    return rst
  });
  // 替换后的字符串就是replace的返回值，用变量rst存储。
  params.el.innerHTML = rst;
}

/* 深度优先搜索，遍历dom树-创建虚拟dom */
// 解析是不是模板
function analysis(nodeText){
  let reg = /{{(\w+)}}/g;
  return nodeText.match(reg);
}
function buildVNode(node){
  // 传递真正的节点，遍历dom节点，以创建虚拟节点。
  var temp = new VNode(node, node.nodeType, node.nodeValue);//nodeType: dom节点的类型;nodeValue: 节点的内容;
  for(let i = 0; i < node.childNodes.length; i++){
    // 挨个遍历子节点
    if(node.childNodes[i].nodeType == 1){
      // dom节点
      var child = buildVNode.call(this, node.childNodes[i]);
      temp.appendChild(child);
    }else if(node.childNodes[i].nodeType == 3){
      // 文本节点
      /* 分析文本节点中的模板节点 */
      // let arr = analysis(node.childNodes[i].nodeValue)
      let arr = node.childNodes[i].nodeValue.match(/{{(\w+)}}/g);
      if(arr){
        arr.forEach((el)=>{
          if(this.mapping.get(el)){ //Map的get和set方法
            // 如果当前项（key为el）里边有value，则把节点文本拿到、再向这个value中push新的
            // this.mapping.get(el).push(node.childNodes[i]);
            this.mapping.set(el, this.mapping.get(el).push(node.childNodes[i]));
          }else{
            // 如果当前key不存在，直接设置当前key（el）为数组，且一项为当前使用模板的文本节点
            this.mapping.set(el, [node.childNodes[i]]);
          }
        })
      }
      var child = buildVNode.call(this, node.childNodes[i]);
      temp.appendChild(child);
      
    }else{
      continue;
    }
  }
  return temp;
}
/* 虚拟dom节点，用于描述真实dom */
function VNode(dom, type, value){
  this.dom = dom; // 结构
  this.type = type; // 类型
  this.value = value; // 数值
  this.childNodes = [];
  this.appendChild = function(node){
    if(!(node instanceof VNode)){
      throw TypeError('node is not instanceof VNode');
    }
    this.childNodes.push(node)
  }
}
