import { createStore, applyMiddleware, compose } from 'redux' // 引入创建store函数createStore
import reducer from './reducer' // 引入reducer
import thunk from 'redux-thunk' // 支持action里写异步函数
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose; // compose来自redux

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

// 创建store
const store = createStore(
  reducer,
  enhancer
)
// 导出store
export default store 
