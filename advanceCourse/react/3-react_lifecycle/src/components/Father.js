/* 父亲组件 */
import React from 'react';
import Son from './Son'
const {log} = console;

log(`【父初始化】-流程${1}: start开始创建组件`)
class Father extends React.Component {
  static defaultProps = {}
  // static PropTypes = {}

  constructor(){
    log(`【父初始化】-流程${2}: 检查是否有defaultProps、检查是否有propsType`)

    log(`【父初始化】-流程${3}: constructor构造函数触发`)
    super();
  }
  
  state = {
    count: 0
  }

  componentWillMount(){
    log(`【父初始化】-流程${4}: 执行componentWillMount生命周期函数。此时组件即将挂载到页面上。`)
  }
  
  render(){
    log(`【父初始化】-流程${5}: 执行render函数渲染页面。`)
    let Father = <>
      <h3>生命周期函数流程研究</h3>
      <div className="wrapper">
        <h4>父亲组件生命周期函数检测</h4> 
        count的值： { this.state.count }
        <button onClick = { () => { this.handleClick() } }>增加count的值</button>
        <Son />
      </div>
    </>
    return Father;
  }

  componentDidMount(){
    log(`【父初始化】-流程${6}: 执行componentDidMount生命周期函数。此时组件已经被挂载到页面中。`)
  }

  handleClick(){
    this.setState({
      count: this.state.count + 1
    })
  }
}

export default Father;