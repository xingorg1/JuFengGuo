import React from 'react'
import TodoListUI from './TodoListUI'
import store from '../../store/store' 
import { changeInputValue, clickAddBtn, clickDelBtn} from '../../store/actionCreator'
import { connect } from 'react-redux'

class TodoList extends React.Component{
  // constructor(props){
  //   super(props)
  //   this.state = store.getState()
  //   store.subscribe(this.handleStoreChanged)
  // }

  // handleStoreChanged = () => {
  //   this.setState(store.getState())
  // }
  render(){
    const { todoListVal, handleChange, todoListData, handleClick, handleDelete, showTips } = this.props
    return (
        <TodoListUI 
        showTips = { showTips }
        todoListVal = { todoListVal }
        handleChange = { handleChange }
        handleClick = { handleClick }
        todoListData = { todoListData }
        handleDelete = { handleDelete }
      />
    )
  }
  // 源写法
  // handleChange = (e) => {
  //   store.dispatch(changeInputValue(e.target.value))
  // }

  // handleClick = () => {
  //   store.dispatch(clickAddBtn())
  // }

  // handleDelete = (index) => {
  //   store.dispatch(clickDelBtn(index))
  // }
}
// 源写法
// export default TodoList

// 新写法
// connect第一个参数，表示connect让store和组件进行链接的规则，并把store里的数据映射到组件的props上
const mapStateToProps = (state) => { // 接收参数state，即store中的数据
  return { // 返回一个对象
    todoListVal: state.todoListVal, // 将store里的todoListVal映射到组件props上的todoListVal里边
    showTips: state.showTips,
    todoListData: state.todoListData,
  }
}

// connect第二个参数，表示让组件通过该方法去派发修改store数据的命令
// 接收一个dispatch方法、返回一个对象。把store的dispatch方法挂载到组件的props上
const mapDispatchToProps = (dispatch) => {
/* 详解：dispatch是发布，即store.dispatch，props就是组件的props。
  把store的dispatch方法挂载到组件的props上 
  当组件内数发生变化时，就需要改变store里的数据，改变store里的数据就必须用store.dispatch方法。
  store.dispatch方法被映射到了props上，我就可以在组件利用this.props.xx去调用store.dispatch方法。
*/
  return {
    handleChange: (e) => { // handleChange就是组件.props上的handleChange方法
      // 当调用this.props.handleChange的时候，就调用该函数。该函数父作用域里有dispatch，就是store的dispatch。这里就可以直接派发任务了
      dispatch(changeInputValue(e.target.value))
    },
    handleClick: () => {
      dispatch(clickAddBtn())
    },
    handleDelete: (index) => {
      dispatch(clickDelBtn(index))
    }
  }
}

// 通过调用connect方法，让TodoList组件和store做连接。两个参数都是连接的映射关系
// export default connect(null,null)(TodoList)
export default connect(mapStateToProps,mapDispatchToProps)(TodoList)