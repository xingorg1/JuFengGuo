/* React与React.createElement模拟实现 */
// import React from 'react';
// import {
//   render as gjfRender
// } from 'react-dom';
const {
  log
} = console;

/* 定义一个React对象 */
let React = {}; 

/* 重写React内部的createElement方法 */
React.createElement = function (type, props, ...childrens) {
  // log(type, props, childrens);
  return {
    $$typeod: 'Symbol(react.element)',
    // key: null,
    props: {
      ...props,
      children: childrens
    },
    // ref: null,
    type: type,
    // _owner: null,
    // _store: {
    //   valiable: false
    // }
  }
}
/* 调用方法生成虚拟DOM，并赋值给App */
let App = React.createElement('div', { 
  id: 'gjf',
  className: 'xing_org1^'
}, React.createElement('h3', {
  className: 'love_china',
  data_id: "2019/10/01"
}, '此生无悔入华夏，来世还生中华家！'), '祖国母亲生日快乐！')

/* 重写render函数 */
const gjfRender = function (vNode, container) {
  var dom = document.createElement(vNode['type']), //生成当前vNode的标签
    {
      props
    } = vNode, //解构props用于遍历
    node;
  for (node in props) {
    if (node === 'children') { // 判断是children进行遍历      
      props[node].forEach(el => {
        if (typeof el === 'string') {
          dom.innerHTML += el; //children中纯文本进行追加
        } else {
          gjfRender(el, dom); //children中虚拟节点进行递归遍历
        }
      });
    } else { //非children进行标签的属性设置
      let attr = node === 'className' ? 'class' : node;
      dom.setAttribute(attr, props[node]);
    }
  }
  container.appendChild(dom);
}
/* 使用render函数 */
gjfRender(App, document.getElementById('root'));
