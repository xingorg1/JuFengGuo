import { createStore } from 'redux' // 引入创建store函数createStore
import reducer from './reducer' // 引入reducer

// 创建store
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
// 导出store
export default store 
