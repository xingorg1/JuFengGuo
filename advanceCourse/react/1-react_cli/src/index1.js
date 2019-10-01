import React from 'react'; // 不可删
import ReactDOM from 'react-dom';
// import { render } from 'react-dom'; // 通过解构ReactDOM，取出render函数，下边就可以直接使用了

ReactDOM.render( < div className = "App" >APP.js没有了存在的必要</div>,  document.getElementById('root'));
// render( < div className = "App" >APP.js没有了存在的必要</div>,  document.getElementById('root'));//解构后直接使用render，不用在ReactDOM对象下查找了。

/* 甚至ReactDOM可以改名字 */
// import React from 'react'; // 不可删
// import GjfReactDOM from 'react-dom';
// GjfReactDOM.render( < div className = "App" >APP.js没有了存在的必要</div>,  document.getElementById('root'));
