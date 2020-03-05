import {
  CHANGE_INPUT_VALUE, 
  CLICK_ADD_BTN, 
  CLICK_DEL_BTN, 
  AJAX_DATA_SET,
  REDUX_SAGA_DEMO,
  SAGA_AJAX_RESULT_SET 
} from './actionTypes'
import axios from 'axios'

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

export const ajaxDataSet = (value) => ({type: AJAX_DATA_SET, value})

// 借用redux-thunk，发送异步请求：
export const getDataDemo = (params) => {
  // 不再返回对象，而是返回函数
  return (dispatch,getState) => { // 函数接收store的dispatch和getState，可以直接用
    axios.get(params.url)
    .then(function (response) {
      console.log(response)
      dispatch(ajaxDataSet(response.data.results))
    })
    .catch(function (error) {
      console.log(error);
    })
  }
}

// 上述代码，使用箭头函数简写如下：
export const getDataDemoSimple = params => (dispatch,getState) => {
  axios.get(params.url)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error);
  })
}

// redux-saga 的使用 - 返璞归真，最初是的action创建
export const reduxSagaDemo = () => ({type: REDUX_SAGA_DEMO})

export const safaAjaxResultSet = (value) => ({type: SAGA_AJAX_RESULT_SET, value})

