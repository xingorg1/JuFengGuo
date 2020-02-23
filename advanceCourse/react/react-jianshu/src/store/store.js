import { createStore } from 'redux' // 引入创建store函数createStore
import reducer from './reducer' // 引入reducer
// 创建store
const store = createStore(
  reducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 若安装了，就使用
)
// 导出store
export default store 
