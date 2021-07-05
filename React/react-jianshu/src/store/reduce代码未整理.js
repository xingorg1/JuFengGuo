// 创建默认state数据
const defaultState = { 
  todoListData: [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ],
  todoListVal: ''
}
// 创建reducer函数，接收两个参数：state和action。state默认值是defaultState
const reducer = (state = defaultState, action) => {
  const {type, value} = action,
    newState = JSON.parse(JSON.stringify(state)); // 深拷贝state，接收state但没权利修改state
  if(type === 'change-input-value'){
    // 检测到这是input值输入的action指令，需要告诉store去修改state中的todoListVal属性
    newState.todoListVal = value // reducer没权利改state，只能拷贝个新的对象，改完后发给store自己改state
  }
  if(type === 'click-add-btn'){
    // 添加按钮
    // newState.todoListData.push(value) // 不用传值了，直接用store里边的todoListVal即可
    newState.todoListData.push(newState.todoListVal)
    newState.todoListVal = ''
  }
  if(type === 'click-del-btn'){
    // 删除list一项
    newState.todoListData.splice(value, 1)
  }
  return newState; // 返还新数据给store
}
// 导出reducer
export default reducer
