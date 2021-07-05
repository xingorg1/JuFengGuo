// 函数组件内部融合ts
import React from 'react';
const { log } = console;

interface propsInfo {
  num: number
  countHandle?: (num: number) => void
}
/**
 * 第一🀄种写法 - 自定义的类型
 * @param props propsInfo
 */
/* export function CountComp(props: propsInfo): JSX.Element {
  return (
    <div>
      <button
        onClick={() => { 
          props.countHandle && props.countHandle(props.num - 1) }}
      >
        -
      </button>
      <span>
        {props.num}
      </span>
      <button
        onClick={() => {
          props.countHandle && props.countHandle(props.num + 1)
        }}
      >
        +
      </button>
    </div>
  )
}; */

/**
 * 第二种写法：使用内置的 React.FC 类型
 * @param props
 * 知识点：类型继承、泛型和类型推倒 
 * 原理分析：React.FC类型定义内部，FC通过泛型接收一个类型P（也就是我们这里填的propsInfo）然后类型P定义给props，并且通过类型继承，给props增加了一个children属性，类型是ReactNode。children属性主要用于组件调用时，组件标签内部的内容，是一个可选的属性。
 * 
 * */
export const CountComp: React.FC<propsInfo> = function (props) {
  // export const CountComp: React.SFC<propsInfo> = function (props) { // SFC废弃了，别用
  return (
    <div>
      <button
        onClick={() => { 
          log(props.children) // 使用FC模版类型后，多了children属性，不用我们定义他就有了
          props.countHandle && props.countHandle(props.num - 1) }}
      >
        -
      </button>
      <span>
        {props.num}
      </span>
      <button
        onClick={() => {
          props.countHandle && props.countHandle(props.num + 1)
        }}
      >
        +
      </button>
    </div>
  ) 
}