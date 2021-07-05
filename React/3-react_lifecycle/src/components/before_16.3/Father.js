/* 父亲组件 */
import React from 'react';
import Son from './Son'
const {log} = console;

log(`%c==================父组件生命周期流程图开始==================`,'color: green')
log(`【父初始化】-%c流程${1}: start%c开始创建组件`,'font-size: 12px; color: tomato','font-size：12px;color:#000')
class Father extends React.Component {
  // 检查是否有默认属性和属性校验
  static defaultProps = {}
  // static PropTypes = {}

  constructor(){
    // constructor构造组件函数
    log(`【父初始化】-%c流程${2}: 检查%c是否有defaultProps、检查是否有propsType`,'font-size: 12px; color: tomato','font-size：12px;color:#000')

    log(`【父初始化】-%c流程${3}: constructor%c构造函数触发`,'font-size: 12px; color: tomato','font-size：12px;color:#000')
    super();
  }
  
  state = {
    count: 0,
    showSon: true
  }

  componentWillMount(){
    // 即将挂载组件触发此函数
    log(`【父初始化】-%c流程${4}: componentWillMount%c生命周期函数。此时组件即将挂载到页面上。`,'font-size: 12px; color: tomato','font-size：12px;color:#000')
  }
  
  render(){
    // render渲染函数
    log(`【父初始化】-%c流程${5 + '/9-10'}: render%c函数渲染页面。`,'font-size: 12px; color: tomato','font-size：12px;color:#000')
    let Father = <>
      <h3>16.3以前版本，生命周期函数流程研究</h3>
      <div className="wrapper">
        <h4>父亲组件生命周期函数检测</h4> 
        count的值： { this.state.count }
        <button onClick = { () => { this.handleClick() } }>别点击我超过两次！</button>
        {/* 试着增加两次，两次过后儿子组件移除 */}
        {
          this.state.count < 2 ? <Son count={ this.state.count }/> : ''
        }
        
      </div>
    </>
    return Father;
  }

  componentDidMount(){
    // 挂载完毕触发钩子函数
    log(`【父初始化】-%c流程${6}: componentDidMount%c生命周期函数。此时组件已经被挂载到页面中。`,'font-size: 12px; color: tomato','font-size：12px;color:#000')
    log(`%c================父组件初始化生命周期结束================`,'color: green')
  }

  handleClick(){
    // 触发修改state中的值 
    log(`【父组件state更改】-%c流程${7}%c: 当state数据被重新设置时`,'font-size: 12px; color: tomato','font-size：12px;color:#000')
    this.setState({
      count: this.state.count + 1,
      showSon: this.state.count < 3
    })
  }

  shouldComponentUpdate(nextProps,nextStates){
    // 询问是否可更新组件数据
    log(`【父组件state更改】-%c流程${8}: shouldComponentUpdate%c钩子函数监听并拦截。询问是否需要更新。（我可以更新你的state数据吗？）`,'font-size: 12px; color: tomato','font-size：12px;color:#000')
    // 写了此方法，就必须要有返回值，否则报错 
    // return false; // false表示不更新，流程不向下进行
    return true; // true进行更新。流程继续向下
    return nextStates.count !== this.state.count
  }

  componentWillUpdate(){
    // 即将更新state数据
    log(`【父组件state更改】-%c流程${9}: componentWillUpdate%c生命周期钩子函数，组件的state即将被更新`,'font-size: 12px; color: tomato','font-size：12px;color:#000')
  }

  // 中间回重新渲染页面

  componentDidUpdate(){
    // state数据更新完毕
    log(`【父组件state更改】-%c流程${10}: componentDidUpdate%c生命周期钩子函数，在重新回去执行render函数渲染页面后触发，表示组件的state已经被更新完毕`,'font-size: 12px; color: tomato','font-size：12px;color:#000')
    log(`%c================父组件生命周期流程图一波结束================`,'color: #1af')
  }
  
  
}

export default Father;