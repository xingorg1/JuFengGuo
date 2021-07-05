import React, {Component} from 'react'
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { Button } from 'antd';
import { List } from 'antd';
import './AntDesign.scss'
// 引入store
import store from '../../store/store' 
class AntDesign extends Component{
  constructor(props){
    super(props)
    // 通过getState函数调用，获取store数据
    this.state = store.getState()
    console.log(this.state)
    // 订阅store改变
    store.subscribe(this.handleStoreChanged)
  }
  handleStoreChanged = () =>{
    // 组件state与store.state同步
    this.setState(store.getState())
    // 这里有个问题，store.getState每次得到的inputVal都是当前键入的单个字母，怎么就展示到input内部后是一整串数据了？
    console.log(store.getState()) // 因为订阅的value都是每次action提交的value、也就是e.target.value。所以是一整串而不是单个字母
  }
  render(){
    // 使用state中的数据
    const { todoListData, todoListVal } = this.state
    return (<div className="antd-wrapper">
        <h1>AntDesign做的TodoList：</h1>
        <Input 
          placeholder="Basic usage" 
          value={ todoListVal } 
          onChange={ this.handleChange }/>
        <Button type="primary" onClick={ this.handleClick }>添加</Button>
        <List
          size="small"
          header={<div>待做列表：</div>}
          bordered
          dataSource={ todoListData }
          renderItem={
            (item, index) => (
              <List.Item 
                onClick={() => {
                  this.handleDelete(index)
                }}
              >{item}</List.Item>
            )
          }
        />
    </div>)
  }
  handleChange = (e) => {
    // action有固定的样式，具体如下
    const action = {
      type: 'change-input-value', // type必须，描述要做什么
      value: e.target.value // value可选，传值表示要改的数据的最终结果是什么
    }
    // 调用store的dispatch方法，分发action到store,实现通信
    store.dispatch(action)
  }
  handleClick = () => {
    const action = {
      type: 'click-add-btn',
      // value: this.state.todoListVal // 这里不用传值了，直接用store里边的todoListVal即可
    }
    store.dispatch(action)
  }
  handleDelete = (index) => {
    console.log(index)
    const action = {
      type: 'click-del-btn',
      value: index 
    }
    store.dispatch(action)
  }
}

export default AntDesign