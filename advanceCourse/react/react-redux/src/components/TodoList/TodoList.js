import React from 'react'
import TodoListUI from './TodoListUI'
import store from '../../store/store' 
import { changeInputValue, clickAddBtn, clickDelBtn} from '../../store/actionCreator'

class TodoList extends React.Component{
  constructor(props){
    super(props)
    this.state = store.getState()
    store.subscribe(this.handleStoreChanged)
  }

  handleStoreChanged = () => {
    this.setState(store.getState())
  }
  render(){
    const { todoListVal, todoListData, showTips } = this.state
    return (
        <TodoListUI 
        showTips = { showTips }
        todoListVal = { todoListVal }
        handleChange = { this.handleChange }
        handleClick = { this.handleClick }
        todoListData = { todoListData }
        handleDelete = { this.handleDelete }
      />
    )
  }

  handleChange = (e) => {
    store.dispatch(changeInputValue(e.target.value))
  }

  handleClick = () => {
    store.dispatch(clickAddBtn())
  }

  handleDelete = (index) => {
    store.dispatch(clickDelBtn(index))
  }
}

export default TodoList