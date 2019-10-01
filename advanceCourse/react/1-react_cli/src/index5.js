/* React与React.createElement模拟实现 - 错误的将render和createElement的功能结合到一起了 */
// import React from 'react';
// import {
//   render as gjfRender
// } from 'react-dom';
const {
  log
} = console;

let React = {}; //定义一个React对象
React.createElement = function (type, props, ...childrens) { //重写React内部的createElement方法
  debugger
  log(type, props, childrens);
  let vNode = null,
    i;
  vNode = document.createElement(type);
  for (i in props) {
    var attrName = i === 'className' ? 'class' : i;
    vNode.setAttribute(attrName, props[i]);
  }
  childrens.forEach((el) => {
    vNode.innerText += el;
  })
  log(vNode)
  return JSON.stringify(vNode); //抛出虚拟节点，到这里被卡住，因为返回的是Node节点，带html格式的，字符串化后就形如[object HTMLDivElement]这样，不符合要求
}
log(React)
let App = React.createElement('div', { //调用方法生成虚拟DOM，并赋值给App
  id: 'gjf',
  className: 'xing_org1^'
}, React.createElement('h3', {
  className: 'love_china'
}, '此生无悔入华夏，来世还生中华家！'), '祖国母亲生日快乐！')
log(App)

// gjfRender(App, document.getElementById('root'));