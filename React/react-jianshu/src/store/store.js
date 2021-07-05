import { createStore, applyMiddleware, compose } from 'redux' // 引入创建store函数createStore。 compose合并多个store增强器（store增强 https://blog.csdn.net/weixin_43648947/article/details/100114063）
import reducer from './reducer' // 引入reducer
import thunk from 'redux-thunk' // Redux store 仅支持同步数据流。使用 thunk 等中间件可以帮助在 Redux 应用中实现异步性 https://www.jianshu.com/p/51c8eaa9fa2a
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
  : compose // compose来自redux

const enhancer = composeEnhancers(
  applyMiddleware(thunk) //applyMiddleware用来合并多个中间件，逗号隔开
  // other store enhancers if any 配置详见：https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
)

// 创建store
const store = createStore(
  reducer, // preloadedState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 若安装了，就使用
  enhancer
)
// 导出store
export default store
