import React from 'react';
import { CountComp } from './components/CountComp';
const {log} = console
let num = 1
function App() {
  
  return (
    <div className="App">
      <h1>三子棋</h1>
      <CountComp num={num} countHandle={(num1) => {
        num = num1
        log(num1, num)
      }}>
        <h1>我是CountComp的内容部分，会被props的children属性接收。</h1>
        {/* children里传递纯文本和jsx还不一样呢 */}
      </CountComp>
    </div>
  );
}

export default App;
