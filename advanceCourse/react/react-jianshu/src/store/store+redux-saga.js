// redux store + redux-saga
import { createStore, applyMiddleware, compose } from 'redux' // 引入创建store函数createStore
import reducer from './reducer' // 引入reducer
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// 合成saga中间件和redux-devtools工具中间件
const composeEnhancers = 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
  ? 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) 
  : 
  compose; // compose来自redux
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

// 创建store
const store = createStore(
  reducer,
  enhancer
)

// then run the saga
sagaMiddleware.run(mySaga)

// 导出store
export default store
