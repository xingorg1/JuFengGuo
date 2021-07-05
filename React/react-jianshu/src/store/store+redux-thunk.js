import { createStore, applyMiddleware, compose } from 'redux' // 引入创建store函数createStore
import reducer from './reducer' // 引入reducer
import thunk from 'redux-thunk' // 支持action里写异步函数
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose; // compose来自redux

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any 配置详见：https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
);

// 创建store
const store = createStore(
  reducer, // preloadedState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 若安装了，就使用
  enhancer
)
// 导出store
export default store 
