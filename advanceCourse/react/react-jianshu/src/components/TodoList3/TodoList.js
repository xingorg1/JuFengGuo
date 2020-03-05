// 3、优化todoList代码
import React from 'react'
import '../../statics/css/TodoList.scss'
import TodoItem from './TodoItem'
class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: ['想你','好想你','好想好想你'],
      todoItem: '',
      todoTips: false
    }
  }
  render() {
    const { todoList, todoItem, todoTips } = this.state
    let TodoList = <>
      <div className="todolist-wrapper">
        <h1>小石头拆分后的TodoList</h1>
        <input 
          ref={(todoInput) => {
            this.todoInput = todoInput
          }}
          className="todolist-input" 
          type="text"
          value={ todoItem } 
          onChange={ this.handleChange }
        />
        <button 
          className="todolist-btn todolist-add" 
          onClick={ this.handleClick }
        >+</button>
        {/* { 
          todoTips 
          ? 
          <p className="todolist-tips" >请填写内容再添加!</p> 
          : 
          ''
        } */}
        <p className={todoTips ? "todolist-tips" : "todolist-tips hide"} >请填写内容再添加!</p> 
        <div className="todolist-list">
          <h3>待做列表:</h3>
          <ul 
            ref={(todoListUl)=>{
                this.todoListUl = todoListUl
            }} 
            className="todolit-ul"
          >
            { this.todoListToItem() }
          </ul>
          { 
            todoList.length <= 0 
            ? 
            <p className="todolist-empty">列表为空，你可以添加新的。</p> 
            : 
            ''
          }
        </div>
      </div>
    </>
    return TodoList
  }
  todoListToItem = () => {
    return this.state.todoList.map((item,i) => {
      return (
        <TodoItem 
          item={ item } 
          index={ i } 
          deleteFn={ this.handleDelete } 
          key={ i + item }
        />
      )
    })
  }

  handleChange = (e) => {
    const todoItem = e.target.value
    this.setState(() => ({ todoItem }))
  }

  handleClick = () => {
    console.log(this.todoInput)
    if(this.state.todoItem === ''){
      this.setState(() => ({
        todoTips: true
      }))
      return false;
    }
    this.setState((prevState) => {
      return {
        todoList: [...prevState.todoList, prevState.todoItem],
        todoItem: '',
        todoTips: false
      }
    })
    console.log(this.todoListUl)
    console.log(this.todoListUl.querySelectorAll('li').length)
  }

  handleDelete = (index) => {
    this.setState((prevState) => {
      const todoList = [...prevState.todoList]
      todoList.splice(index, 1)
      return { todoList }
    })
  }
}

export default TodoList
