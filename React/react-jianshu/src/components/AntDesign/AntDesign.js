import React, {Component} from 'react'
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { Button } from 'antd';
import { List } from 'antd';
import '../../statics/css/AntDesign.scss'
// 引入store
import store from '../../store/store' 

// import {CHANGE_INPUT_VALUE, CLICK_ADD_BTN, CLICK_DEL_BTN} from '../../store/actionTypes'
import { changeInputValue, clickAddBtn, clickDelBtn} from '../../store/actionCreator'

class AntDesign extends Component{
  constructor(props){
    super(props)
    // 通过getState函数调用，获取store数据
    this.state = store.getState()
    // 订阅store改变
    store.subscribe(this.handleStoreChanged)
  }
  handleStoreChanged = () =>{
    // 组件state与store.state同步
    this.setState(store.getState())
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
    /* 第1.1种：局部action的写法
    // action有固定的样式，具体如下
    const action = {
      type: CHANGE_INPUT_VALUE, // type必须，描述要做什么
      value: e.target.value // value可选，传值表示要改的数据的最终结果是什么
    }
    // 调用store的dispatch方法，分发action到store,实现通信
    store.dispatch(action) 
    */

    //  第二种，actionCreator的写法
    store.dispatch(changeInputValue(e.target.value))
  }
  handleClick = () => {
    store.dispatch(clickAddBtn())
  }
  handleDelete = (index) => {
    /* 第1.2种写法：直接dispatch传递action写法
    store.dispatch({
      type: CLICK_DEL_BTN,
      value: index 
    }) */

    //  第二种，actionCreator的写法
    store.dispatch(clickDelBtn(index))
  }
}

export default AntDesign