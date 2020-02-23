import React from 'react';
import axios from 'axios'
import urls from "../../apis/urls";
import { getDataDemo } from '../../store/actionCreator'
// import { reduxSagaDemo } from '../../store/actionCreator'
import store from '../../store/store'
console.log(urls)

class DemoUI extends React.Component {
  render(){
    return 'DemoUI';
  }
  componentDidMount(){
    // // 第一种，在组件中发起异步请求
    axios.get(urls.douban)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    })

    // // 第二种，利用redux-thunk在action里分发异步请求相关代码
    const action = getDataDemo({url: urls.douban})
    store.dispatch(action)

    // 第三种，利用redux-saga在action里分发异步请求
    // const action = reduxSagaDemo()
    // store.dispatch(action)

    // 使用charles进行本地接口代理 - 失败，待研究
    // axios.get('/charles/myapi/todolist.json')
    // .then(function (response) {
    //   console.log(response)
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })
  }
}

export default DemoUI;