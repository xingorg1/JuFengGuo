import React from 'react';
import Father from './Father';
const {log} = console;

class GrandFather extends React.Component {
  constructor(){
    super();
  }
  inputDom = React.createRef(); //非受控组件

  state = {
    inputVal: '',
    todoList: []
  }

  render(){
    let GrandFather = <>
      {/* 爷爷组件 */}
      <h3>组件间交互</h3>
      <div className="wrapper">
        <input type="text" ref={ this.inputDom }/>
        <button onClick={ this.handleClick }>添加</button>
        <Father value={ this.state.inputVal } />
      </div>
    </>
    return GrandFather;
  }

  handleClick = () => {
    log(this.inputDom)
    let inputVal = this.inputDom.current.value;
    if(inputVal.length > 0){
      this.setState({
        todoList: [...this.state.todoList, inputVal],
        inputVal
      })
    }
    log(this.state)
  } 
}

export default GrandFather;