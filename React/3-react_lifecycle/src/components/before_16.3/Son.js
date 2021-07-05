import React from 'react';
const {log} = console;
log('16.3版本以前组件生命周期流程图')
log(`%c==============子组件生命周期流程图开始==============`,'color: #78d778')
log(`【儿子初始化】-%c流程${1}: start%c开始创建组件`,'font-size: 12px; color: #f6b1a5','font-size：12px;color:#666')
class Son extends React.Component {
  static defaultProps = {
    count: '没有值'
  }
  // static PropTypes = {}

  constructor(){
    // constructor构造组件函数
    log(`【儿子初始化】-%c流程${2}: 检查%c是否有defaultProps、检查是否有propsType`,'font-size: 12px; color: #f6b1a5','font-size：12px;color:#666')

    log(`【儿子初始化】-%c流程${3}: constructor%c构造函数触发`,'font-size: 12px; color: #f6b1a5','font-size：12px;color:#666')
    super();
  }
  state = {
    
  }

  componentWillMount(){
    // 即将挂载组件触发此函数
    log(`【儿子初始化】-%c流程${4}: componentWillMount%c生命周期函数。此时组件即将挂载到页面上。`,'font-size: 12px; color: #f6b1a5','font-size：12px;color:#666')
  }

  render(){
    // render渲染函数
    log(`【儿子初始化】-%c流程${5 + '/9-10'}: render%c函数渲染页面。`,'font-size: 12px; color: #f6b1a5','font-size：12px;color:#666')
    let { count } = this.props;
    let Son = <div style={ {"color": "#333","marginTop": "30px","background": "#f7f7f7","padding": "10px", "borderRadius": "10px"} }>
      <h4>儿子组件生命周期函数检测</h4>
      <p>现在父亲传过来count的值是： { count } </p>
    </div>
    return Son;
  }

  componentDidMount(){
    // 挂载完毕触发钩子函数
    log(`【儿子初始化】-%c流程${6}: componentDidMount%c生命周期函数。此时组件已经被挂载到页面中。`,'font-size: 12px; color: #f6b1a5','font-size：12px;color:#666')
    log(`%c==============子组件初始化生命周期结束==============`,'color: #78d778')
  }

  shouldComponentUpdate(){
    // 询问是否可更新组件数据
    log(`【儿子组件state更改】-%c流程${8}: shouldComponentUpdate%c钩子函数监听并拦截。询问是否需要更新。（我可以更新你的state数据吗？）`,'font-size: 12px; color: #f6b1a5','font-size：12px;color:#666')
    // 写了此方法，就必须要有返回值，否则报错 
    // return false; // false表示不更新，流程不向下进行
    return true; // true进行更新。流程继续向下
  }

  componentWillUpdate(){
    // 即将更新state数据
    log(`【儿子组件state更改】-%c流程${9}: componentWillUpdate%c生命周期钩子函数，组件的state即将被更新`,'font-size: 12px; color: #f6b1a5','font-size：12px;color:#666')
  }

  // 中间回重新渲染页面

  componentDidUpdate(){
    // state数据更新完毕
    log(`【儿子组件state更改】-%c流程${10}: componentDidUpdate%c生命周期钩子函数，重新回去执行render函数渲染页面后触发，表示组件的state已经被更新完毕`,'font-size: 12px; color: #f6b1a5','font-size：12px;color:#666')
    log(`%c==============子组件生命周期流程图一波结束==============`,'color: #95d8fe')
  }

  componentWillReceiveProps(){
    // 父组件state修改，子组件即将接受修改
    log(`【儿子组件state更改，子组件反应】-%c流程${1}: componentWillReceiveProps%c生命周期钩子函数，父组件state修改，子组件的props即将被更新`,'font-size: 12px; color: #ffda00','font-size：12px;color:#666')
  }

  componentWillUnmount(){
    // 子组件即将被卸载时触发
    log(`【儿子组件要被卸载】-%c流程${1}: componentWillUnmount%c生命周期钩子函数，父组件移除子组件、子组件被卸载前触发`,'font-size: 12px; color: #f4f','font-size：12px;color:#666')
  }

}

export default Son;