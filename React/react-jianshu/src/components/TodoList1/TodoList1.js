// 1、未拆分的todoList功能
import React from 'react'
import '../../statics/css/TodoList.scss'

class TodoList1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: ['想你','好想你','好想好想你'],
      todoItem: '',
      todoTips: false
    }
  }
  render() {
    let TodoList1 = <>
      <div className="todolist-wrapper">
        <h1>小石头的TodoList</h1>
        <input className="todolist-input" type="text" value={ this.state.todoItem } onChange={ this.handleChange }/>
        <button className="todolist-btn todolist-add" onClick={ this.handleClick }>+</button>
        { this.state.todoTips ? <p className="todolist-tips" >请填写内容再添加!</p> : ''}
        <div className="todolist-list">
          <h3>待做列表:</h3>
          <ul className="todolit-ul">
            {
              this.state.todoList.map((item,i) => {
                return (<li className="todolist-li" key={ i + item }>
                  { item }
                  <button className="todolist-btn todolist-del" onClick={ ()=>{
                    this.handleDelete(i)
                  } }>-</button>
                </li>)
              })
            }
          </ul>
          { this.state.todoList.length <= 0 ? <p className="todolist-empty">列表为空，你可以添加新的。</p> : ''}
        </div>
      </div>
    </>
    return TodoList1
  }
  
  handleChange = (e) => {
    this.setState({
      todoItem: e.target.value
    })
  }

  handleClick = () => {
    if(this.state.todoItem === ''){
      this.setState({
        todoTips: true
      })
      return false;
    }
    this.setState({
      todoList: [...this.state.todoList, this.state.todoItem],
      todoItem: '',
      todoTips: false
    })
  }

  handleDelete = (index) => {
    const list = [...this.state.todoList]
    list.splice(index, 1)
    this.setState({
      todoList: list
    })
  }
}

export default TodoList1

