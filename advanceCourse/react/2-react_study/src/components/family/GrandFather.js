import React from 'react';
import Father from './Father';
const {log} = console;

class GrandFather extends React.Component {
  // constructor(){
  //   super();
  // }
  inputDom = React.createRef(); //非受控组件

  state = {
    todoList: []
  }

  render(){
    let GrandFather = <>
      {/* 爷爷组件 */}
      <h3>组件间交互 - 层级组件数据传递</h3>
      <div className="wrapper">
        <input type="text" ref={ this.inputDom } style={ {'marginBottom': '10px'} }/>
        <button onClick={ this.handleClick }>添加</button>
        {/* 通过属性的方式，把爷爷组件的方法传递下去。后边的组件通过props接收后继续用属性的方法向下传递。直到目标组件接收 */}
        <Father todoList={ this.state.todoList } handleDelete = { this.handleDelete }/>
      </div>
    </>
    return GrandFather;
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

export default GrandFather;