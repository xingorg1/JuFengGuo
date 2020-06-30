import React,{ Fragment } from 'react';
import './baiduSearch.css';
import data from './data.json'
import HotList from '../components/HotList'
import TodoList from '../components/TodoList/TodoList'
import Control from '../components/Control'
import UnControl from '../components/UnControl'
import PropertyTransfer from '../components/PropertyTransfer'
import Family from '../components/family/GrandFather'
import CreateContext from '../components/createContext/Provider'
import HookExample from '../components/Hooks/Hooks'

console.log(data)
console.log(TodoList)

// React.Fragment标签
// function App() {
//   return (
//     <React.Fragment>
//       <div className="baiduSearch">
//       </div>
//       <h3>百度搜索布局项目实战（JSX深入了解）</h3>
//     </React.Fragment>
//   );
// }

// 解构Fragment标签
// function App() {
//   return (
//     <Fragment>
//       <div className="baiduSearch">
//       </div>
//       <h3>百度搜索布局项目实战（JSX深入了解）</h3>
//     </Fragment>
//   );
// }

// 空白标签
// function App() {
//   return (
//     <>
//       <div className="baiduSearch">
//       </div>
//       <h3>百度搜索布局项目实战（JSX深入了解）</h3>
//     </>
//   );
// }
function test(){
  return "必须返回的是字符串？"
}
function test1(){
  return 2 + 2
}
function test2(){
  var mySelf = "我没有返回值";
  console.log(mySelf);
  // return 2 + 2
}
var data2 = {
  name: '测试数据',
  target: '函数组件传参'
}
function Component(){
  return <>
          <h3>函数组件</h3>
          <div className="comp wrapper">我是一个函数组件</div>
        </>
  // return '函数组件里不返回jsx会怎样'
}
let Person = {
  // name: '小石头',
  age: 21,
  sex: '女',
  figure: {
    weight: 45,
    height: 150
  },
  income: 9999
}

function App() {
  return (
    <Fragment>
      {/* jsx语法学习与应用 */}
      <div className="baiduSearch">
        <h3>百度搜索布局项目实战（JSX深入了解）</h3>
        <div className="wrapper">
          <h4>搜索热点 <span className="change">换一换</span></h4>
          <ul className="list">
            {
              /* [
                <li className="item one" >
                  <a href="www.baidu.com"  className="link">
                    <span className="number">1</span>
                    啊客户端发卡号发卡号
                    <span className="tag">新</span>
                  </a>
                  <span className="total">47万</span>
                </li>
              ] */
            }
            {
              // 用map方法过滤data，将数据处理成标签后，并返回新的数组渲染到页面上。
              data.map((el,i)=>{
                // 给li添加1，2，3类名的不会。暂时的方式需要写两个item，不知道默认的类名怎么加
                return <li className={[1,2,3].includes(el.id) ? 'item '+['one','two','three'][el.id - 1] : 'item'} key={ el.id }>
                  <a href="www.baidu.com"  className="link">
                    <span className="number">{ i + 1 }</span>
                    { el.title }
                    { 
                      // 没有if，需要用三元表达式实现
                      el.new ? <span className="tag">新</span> : ''
                    }
                  </a>
                  <span className="total">{ el.hot }</span>
                </li>
              })
            }
          </ul>
        </div>
      </div>
      {/* jsx语法探究 */}
      <div className="wrapper" style={ {padding: '20px', background: "#efe" } }>
        <h3 style={ {borderBottom: '1px solid #999', paddingBottom: '10px'} }>试试JSX里的js语法，花括号里都可以写啥</h3>
        <p>
          字符串：{ '一个字符串' }
        </p>
        <p>
          表达式：{ 1 + 1 }
        </p>
        <p>
          三元表达式：{ true ? '加油郭菊锋！' : '加油小石头！' }
        </p>
        <p>
          函数调用：{ test() }
        </p>
        <p>
          函数调用 - 也可以返回表达式 - { test1() }
        </p>
        <p> 函数调用 - 没有返回值时：{ test2()} </p>
        <p>非要渲染一个对象：{JSON.stringify({a: 1})}</p>
        <p>可以渲染数组：{ [1,2,<a href="http://www.jd.com">数组里的标签</a>] }</p>
      </div>
      {/* 函数组件 */}
      <Component className="area">里边还能写什么吗</Component>
      { Component() }
      {/* 函数组件应用 */}
      <HotList listData={ data } testData={ data2 }></HotList>
      {/* class组件应用 */}
      <TodoList />
      {/* 受控组件 */}
      <Control />
      {/* 非受控组件 */}
      <UnControl />
      {/* 属性传递 */}
      <PropertyTransfer version = { 1.0 } Person={ Person } { ...Person }/>
      {/* 组件间交互 - 大家庭 */}
      <Family />
      {/* 组件间交互 - createContext */}
      <CreateContext />
      {/* Hook的学习 */}
      <HookExample />
    </Fragment>
  );
}

export default App;
