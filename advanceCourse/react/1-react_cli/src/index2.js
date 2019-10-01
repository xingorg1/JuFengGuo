import React from 'react'; // 不可删
import { render } from 'react-dom'; // 通过解构ReactDOM，取出render函数，下边就可以直接使用了

let app = <div>使用render函数，自定结构</div>
render( <app/>,  document.getElementById('root'));//解构后直接使用render，不用在ReactDOM对象下查找了。

