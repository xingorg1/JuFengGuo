import React from 'react';
import { Provider } from './context'
import CenterComp from './CenterComp';
const {log} = console;
log('React.createContext执行结果如下：')
log(React.createContext())
log(Provider)
class ProviderComp extends React.Component {
  // constructor(){
  //   super();
  // }
  inputDom = React.createRef(); //非受控组件

  state = {
    othertest: '传递数据测试',
    todoList: []
  }

  render(){
    // {/* 提供者组件 - Provider */}
    // 使用Provider组件，包裹住需要传值的组件。这里放在最外边即可。
    // 传值方式是，在Provider组件上写一个固定名字为value的属性。其值是一个对象。对象内部集合要传的所有值和方法即可。
    let ProviderComp = <Provider value={ {
      // 一定记住react的特色是js语法写在大括号里，符合JSX的语法规定。与value属性的值是一个对象的大括号区分开来
      handleDelete: this.handleDelete, //传递共享的方法
      othertest: this.state.othertest //传递共享的属性值。这里可以传多个值的做个测试
    } }>
      <h3>组件间交互 - react.createContext实现</h3>
      <div className="wrapper">
        <input type="text" ref={ this.inputDom } style={ {'marginBottom': '10px'} }/>
        <button onClick={ this.handleClick }>添加</button>
        <CenterComp todoList={ this.state.todoList }/>
      </div>
    </Provider>
    return ProviderComp;
  }

  handleClick = () => {
    let inputVal = this.inputDom.current.value;
    if(inputVal){
      this.setState({
        todoList: [...this.state.todoList, inputVal],
      })
    }
    this.inputDom.current.value = '';//清空input框
  } 
  handleDelete = (i) => {
    let todoList = [...this.state.todoList]; // 为什么每次更改array类型的数据，都需要先深拷贝一遍删除的才算正确呢
    todoList.splice(i, 1);
    this.setState({
      todoList
    })
  }
}

export default ProviderComp;