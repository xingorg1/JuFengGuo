import React, { useState } from 'react';
import * as ReactAll from 'react';
console.log(ReactAll)
console.log([{ name: 1 }, { name: 2 }, [{ name: 3 }, { name: 4 }]].flat())

function HooksExample () {
  console.log('HooksExample function')
  // 声明一个新的叫做 “count” 的 state 变量, React 会在重复渲染时记住它当前的值，并且提供最新的值给我们的函数。
  const [count, setCount] = useState(0); // 数组的解构赋值
  // const [count, setCount] = useState(0); // 重复声明同一个变量报错，这是es的规则：Parsing error: Identifier 'count' has already been declared
  const [text, setText] = useState('');
  const [objVal, setObjval] = useState({
    name: '小石头',
    age: 0
  })
  const arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  console.log(count, setCount, useState)
  console.log('useState的结果是一个数组，const定义是数组的解构赋值', useState([2, 3, 4]))
  return (
    <div>
      <h3>Hooks</h3>
      <div className="wrapper">
        <p>You clicked {count} times</p>
        {/* // 当用户点击按钮后，我们传递一个新的值给 setCount。React 会重新渲染 Example 组件，并把最新的 count 传给它。 */}
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
        <button onClick={() => {
          // console.log(count, text, arr)
          return setText(arr[count] || '哈哈哈')
        }}>改文案</button>
        <div>
          {text}
        </div>
        <hr />
        <div className="form">
          <div>
            <label htmlFor="name">名字</label>
            <input id="name" value={objVal.name} onChange={() => {
              // 问题，怎么拿到input框里输入的内容？？？？？
              console.log(objVal.name)
              setObjval({
                name: objVal.name + '2'
              })
            }} />
          </div>
          <div>
            <label htmlFor="age">年龄</label>
            <input id="age" value={objVal.age} onChange={function (e) {
              console.log(objVal.age, this, e)
            }} />
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setObjval({
                name: objVal.name, // 因为“不像 class 中的 this.setState，更新 state 变量总是替换它而不是合并它”，所以需要name也重新赋值一遍！！！https://zh-hans.reactjs.org/docs/hooks-state.html#tip-using-multiple-state-variables
                age: objVal.age + 1 // 改对象的内容，要给set的函数传一个对象结构。
              })
            }}
          >长大一岁</button>
        </div>
      </div>
    </div>
  );
}

export default HooksExample;