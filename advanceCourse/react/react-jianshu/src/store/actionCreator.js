import {CHANGE_INPUT_VALUE, CLICK_ADD_BTN, CLICK_DEL_BTN} from './actionTypes'

// 一个actionCreator函数，用于input时触发
export const changeInputValue = (value) => {
  // 接收一个value，调用时传递。
  // 返回一个对象，是action格式
  return {
    type: CHANGE_INPUT_VALUE,
    value
  }
}

export const clickAddBtn = () => ({type: CLICK_ADD_BTN})

export const clickDelBtn = (value) => ({type: CLICK_DEL_BTN, value})