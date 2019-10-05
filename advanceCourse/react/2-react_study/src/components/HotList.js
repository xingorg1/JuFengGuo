/* 函数组件应用 */
import React from 'react'

function HotList(props){
  console.log("打印函数组件内部的this：",this)
  console.log(props)
  console.log(props.testData)
  const { listData } = props;
  return (
    <>
      <div className="baiduSearch">
        <h3>百度搜索布局项目实战（函数组件使用）</h3>
        <div className="wrapper">
          <h4>搜索热点 <span className="change">换一换</span></h4>
          <ul className="list">
            {
              // 用map方法过滤data，将数据处理成标签后，并返回新的数组渲染到页面上。
              listData.map((el,i)=>{
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
    </>
  )
}

export default HotList;