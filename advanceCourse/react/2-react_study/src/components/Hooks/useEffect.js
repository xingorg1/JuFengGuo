import React, { useState, useEffect } from 'react'

function useEffectFun(params) {
  const [count, setCount] = useState(0)
  useEffect(() => { // useEffect：告知在渲染(render)后，执行什么操作。react会在更新dom后执行这个函数的回调
    console.log('Similar to componentDidMount and componentDidUpdate,componentWillUnmount')
    // 所以，如果是在class的生命周期，要实现下边的效果，下边的代码就要在componentDidMount和componentDidUpdate两个周期里都执行下
    document.title = `the number is ${count}`
  })
  return (
    <>
      <h1>{count}</h1>
      <button onClick={
        () => {
          setCount(count + 1)
        }
      }>增加</button>
    
    </>
  )
}

export default useEffectFun
