// 主要实现：结合AntD、Redux，拆分TodoList组件为UI组件和容器组件
import React from 'react'
import 'antd/dist/antd.css';
import { Input, Button, List, Alert } from 'antd';
import '../../statics/css/AntDesign.scss'

// 定义一个函数，接收props参数
const TodoListUI = (props) => {
  const { 
    showTips,
    todoListVal, 
    handleChange, 
    handleClick, 
    todoListData, 
    handleDelete 
  } = props
  return (
    <div className="antd-wrapper">
      <h1>结合AntD、Redux，拆分TodoList组件为UI组件和容器组件,实现TodoList：</h1>
      <p>函数组件-无状态组件</p>
      <Input 
        placeholder="Basic usage" 
        value={ todoListVal } 
        onChange={ handleChange }/>
      <Button type="primary" onClick={ handleClick }>添加</Button>
      <Alert message="需要填写内容才能提交" type="error" className={ !showTips ? 'hide' : ''}/>
      <List
        size="small"
        header={<div>待做列表：</div>}
        bordered
        dataSource={ todoListData }
        renderItem={
          (item, index) => (
            <List.Item 
              onClick={() => {
                handleDelete(index)
              }}
            >{item}</List.Item>
          )
        }
      />
    </div>
  )
} 

export default TodoListUI