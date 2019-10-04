import React from 'react'
import './TodoList.css'
const { log } = console;
class TodoList extends React.Component {
  // handleChange = this.handleChange.bind(this)
  constructor(){
    super();
    // 状态：组件内部要使用的数据称之为状态。
    // this.state = { list: [1,2,3]};
  }
  state = {
    inputVal: '',
    list: [1,2,3]
  };//等价于上边的this.state赋值，es7的写法。
  
  render(){
    let todoList = <>
      <h3>我是类组件 - TodoList</h3>
      <div className="form">
        <input 
          type="text" 
          value={ this.state.inputVal } 
          // onChange= { this.handleChange.bind(this) }
          onChange= { this.handleChange }
          placeholder="添加代办项"/>
        <button
          onClick={ this.handleClick.bind(this) }
        >添加</button>
        <ul>
          {
            // this.state状态数据应用
            this.state.list.map((el, i)=>{
              return <li key={ el+"todolist" }> 第 { el } 项  
                        <span 
                          className="del" 
                          // onClick={ this.handleDelete.bind(this,i) }
                          onClick={ ()=>{ this.handleDelete(i) } }
                        >X</span>
                      </li>
            })
          }
        </ul>
      </div>
    </>
    return todoList; // 所以类组件内部必须有render函数，并return返回一个可渲染的值。
    
  };

  /* 类里边的方法 */
  // handleChange(e) {
  handleChange = (e) => {
    // 输入
    // log(this) // 默认，this指向undefined
    // log(e, e.target.value)
    // this.state.inputVal = e.target.value;
    this.setState({
      inputVal: e.target.value
    })
  }

  handleClick(){
    // 添加
    if(this.state.inputVal){
      this.setState({
        list: [...this.state.list,this.state.inputVal],
        inputVal: ''
      });
    }
  }

  // handleDelete(index) {
  handleDelete = (index) => {
    // 删除
    var newList = [...this.state.list];
    newList.splice(index,1);
    // log(index,newList)
    this.setState({
      list: newList
    })
    /* 
      // 老师的
      var list = this.state.list;
      list.splice(index,1);
      log(list)
      this.setState({
        list
      })
    */
  }
}

export default TodoList