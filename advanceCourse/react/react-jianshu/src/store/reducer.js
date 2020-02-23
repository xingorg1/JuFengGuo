import {CHANGE_INPUT_VALUE, CLICK_ADD_BTN, CLICK_DEL_BTN, AJAX_DATA_SET} from './actionTypes'
// 创建默认state数据
const defaultState = { 
  todoListData: [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ],
  todoListVal: '',
  showTips: false,
  test: false,
  resultData: [] // 异步数据
}
// 创建reducer函数，接收两个参数：state和action。state默认值是defaultState
const reducer = (state = defaultState, action) => {
  // state.test = !state.test 在reducer中改变state没报错、并且实现了。为啥没报错？
  const {type, value} = action,
    newState = JSON.parse(JSON.stringify(state));
  switch(type){
    case CHANGE_INPUT_VALUE: // 输入input
      newState.todoListVal = value
    break;
    case CLICK_ADD_BTN: // 添加按钮
      if(newState.todoListVal.length <= 0) {
        newState.showTips = true
        return newState
      }
      newState.todoListData.push(newState.todoListVal)
      newState.todoListVal = ''
      newState.showTips = false
    break;
    case CLICK_DEL_BTN: // 删除list一项
      newState.todoListData.splice(value, 1)
    break;
    case AJAX_DATA_SET:
      newState.resultData = value // 得到ajax返回的数据
    break;
    default:
    break;
  }
  // 返还新数据给store
  return newState;
}
// 导出reducer
export default reducer
