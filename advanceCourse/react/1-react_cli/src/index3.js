import React from 'react';
import {
  render as gjfRender
} from 'react-dom'; // 通过解构ReactDOM，取出render函数并重命名为gjfRender，下边就可以直接使用了

let App = <div> <h3 > JSX语法讲解 </h3> </div>
gjfRender(App, document.getElementById('root'));