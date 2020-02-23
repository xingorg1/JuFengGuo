import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import urls from "../apis/urls";
import { safaAjaxResultSet } from './actionCreator'
import { REDUX_SAGA_DEMO } from './actionTypes'
// 方法函数可以是普通函数，但最好也写成generator函数
function* axiosGetData(action) {
  console.log('saga‘s axiosGetData', action)
  // generator函数中，不能用promise，得用yeild了
  try{
    let result = yield axios.get(urls.douban)
    console.log(result)
    yield put(safaAjaxResultSet(result.data.results)) // saga里用put分发
  }catch(error){
    console.log(error)
    // 这里还可以put派发另一个action，展示错误提示之类的操作
  }
}

// sagas里必须返回generator函数、让中间件运行这个generator函数
function* mySaga() {
  // 在每次发送' REDUX_SAGA_DEMO '动作时启动fetchUser。
  // 对应操作是发送ajax请求数据，调用功能函数axiosGetData。
  yield takeEvery(REDUX_SAGA_DEMO, axiosGetData); // taskEvery函数是没监听到REDUX_SAGA_DEMO请求一次、就发送一个请求。如果要节流，官方推荐takeLatest
  console.log('mySaga')
}

export default mySaga;