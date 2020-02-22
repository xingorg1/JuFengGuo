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
          className="todolist-input" 
          type="text"
          value={ todoItem } 
          onChange={ this.handleChange }
        />
        <button 
          className="todolist-btn todolist-add" 
          onClick={ this.handleClick }
        >+</button>
        { 
          todoTips 
          ? 
          <p className="todolist-tips" >请填写内容再添加!</p> 
          : 
          ''
        }
        <div className="todolist-list">
          <h3>待做列表:</h3>
          <ul className="todolit-ul">
            {/* 这段逻辑代码可以写到函数里，而不写在UI代码里
            {
              todoList.map((item,i) => {
                return (
                  <TodoItem 
                    item={ item } 
                    index={ i } 
                    deleteFn={ this.handleDelete } 
                    key={ i + item }
                  />
                )
              })
            } */}
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
    // 1、原写法，setState参数是一个对象
    // this.setState({
    //   todoItem: e.target.value
    // })
    // 2、期待setState的参数是一个函数,因为函数是异步的，参数要先备份
    const todoItem = e.target.value
    this.setState(() => {
      return { todoItem }
    })
    // 3、更简写
    // this.setState(() => ({ todoItem }))
  }

  handleClick = () => {
    // 1、初始写法，setState参数传递一个对象
    /* if(this.state.todoItem === ''){
      this.setState({
        todoTips: true
      })
      return false;
    }
    this.setState({
      todoList: [...this.state.todoList, this.state.todoItem],
      todoItem: '',
      todoTips: false
    }) */
    // 2、setState接收一个函数，函数的参数是prevState:上次state的快照
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
  }

  handleDelete = (index) => {
    // 1、初始写法，setState参数是一个对象
    /* const list = [...this.state.todoList]
    list.splice(index, 1)
    this.setState({
      todoList: list
    }) */
    // 2、setState接收一个函数
    this.setState((prevState) => {
      const todoList = [...prevState.todoList]
      todoList.splice(index, 1)
      return { todoList }
    })
  }
}

export default TodoList

