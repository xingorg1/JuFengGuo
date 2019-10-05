/* 组件间属性传递与校验 */
import React from 'react';
// 属性校验
import PropTypes from 'prop-types';
const { log } = console;

class PropertyTransfer extends React.Component {
  // 二、默认属性 — — 静态的方法
  static defaultProps = {
    slogan: '不会艺术的程序员不是好的设计师'
    // name: '不会艺术的程序员不是好的设计师' // 为什么name可以，slogan不可以？区别是name是Person中有的属性、slogan是组件内默认的属性
  }

  // 属性校验
  static propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,//数字格式
    sex: PropTypes.oneOf(['男', '女']),//指定内容
    figure: PropTypes.objectOf(PropTypes.number),//数字对象
    income: (props,propName, componentName)=>{ // 判断内容
      log(props, propName, componentName)
      let number = 10000;
      if( props[propName] < number )
        throw new Error(`
          组件${componentName}中传递过来的参数${propName}，代表的是工资!
          居然小于${number},需要继续努力啊孩子！
        `)
    }
  }
  
  state = {
    /* 获取数据 */
    ...this.props //获取数据，并解构给state。
  }
  render () {
    log(this)
    // var {name, age, figure } = this.props;
    const { slogan } = this.props;
    let PropertyTransfer = <>
      <h3>组件间属性传递与校验</h3>
      <div className="wrapper">
        <p>姓名：
          {/* 使用数据 */}
          { this.state.name }
        </p>
        <p>年龄：{ this.state.age }</p>
        <p>性别：{ this.state.sex }</p>
        <p>特征：
          <span> 体重：{ this.state.figure.weight }</span> 、 
          <span> 身高：{ this.state.figure.height }</span>
        </p>
        <p>收入：{this.state.income }</p>
        <p>slogan: { slogan }</p>
        <button onClick = { this.handleClick }>更改数据</button>
      </div>
    </>
    return PropertyTransfer;
  }
  
  handleClick = () => {
    log(this)
    /* 修改数据 */
    this.setState({
      name: 'xing.org1^_^'
    })
  }
}
// 一、默认属性 — — 组件的属性
PropertyTransfer.defaultProps = {
  name: '郭菊锋'
}

export default PropertyTransfer;