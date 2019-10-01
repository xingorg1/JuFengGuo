/* JSX了解与React.createElement体验 */
import React from 'react';
import {
  render as gjfRender
} from 'react-dom';

// let App = <div id="gjf" class="xing_org1"> <h3> JSX语法讲解 </h3> </div>
/* 重写React.createElement方法 */
/* let App = <div id="gjf" className="xing_org1^">
            <h3 className="love_china">此生无悔入华夏，来世还生中华家！</h3>
            祖国母亲生日快乐！
          </div> */
let App = React.createElement('div', {
  id: 'gjf',
  className: 'xing_org1^'
}, React.createElement('h3', {
  className: 'love_china'
}, '此生无悔入华夏，来世还生中华家！'), '祖国母亲生日快乐！')
console.log(App)

gjfRender(App, document.getElementById('root'));

