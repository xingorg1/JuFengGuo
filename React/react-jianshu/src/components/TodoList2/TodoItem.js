import React, { Component } from 'react'

class TodoItem extends Component {
  render(){
    const { item, index, deleteFn } = this.props
    return (<li className="todolist-li">
        { item }
        <button 
          className="todolist-btn todolist-del" 
          onClick={ ()=>{ deleteFn(index) } }
          // onClick={ this.handleClick.bind(this) }
        >-</button>
      </li>)
  }
  // handleClick(){
  //   this.props.deleteFn(this.props.index)
  // }
}

export default TodoItem