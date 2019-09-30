import { addFun } from './sum';
import '../css/style.css';

console.log('js');
console.log('index.js');

console.log('addFun函数调用',addFun(2,3));



var a = document.createElement('a');
a.href = 'https://www.baidu.com';
a.innerText = '我是js动态填充进来的';
document.body.appendChild(a);


if(module.hot){// 如果node模块开启了热更新
  module.hot.accept();//就支持热更新
}