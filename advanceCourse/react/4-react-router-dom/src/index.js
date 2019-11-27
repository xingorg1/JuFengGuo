import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import { 
  BrowserRouter as MyRoute,  // 路由容器组件
  // HashRouter,     // 路由容器组件
  Route,          // 路径组件
  Switch,         // 严格匹配组件
  Redirect,       // 重定向组件
  // Link,           // 导航组件
  NavLink,        // 导航组件
} from 'react-router-dom'
// 引入页面级别组件，作为page页面
import Home from './pages/home/home'
import Product from './pages/product/product';
import Answer from './pages/answer/answer';
// 弹窗组件
import Notice from './pages/notice/notice';
import Message from './pages/message/message';
// 公共页面
import Center from './pages/center/center';
import Login from './pages/login/login';
import ErrorPage from './pages/error/error';
// 页面内部组件
import Nav from './components/nav/nav'
ReactDOM.render(<MyRoute>
  <>
    <Nav />
    <section className="section-cont">
      <Switch>
        <Route path="/" component={ Home } exact />
        <Route path="/product" component={ Product } />
        <Route path="/answer" component={ Answer } />
        <Route path="/notice" component={ Notice } />
        <Route path="/message" component={ Message } />
        <Route path="/center" component={ Center } />
        <Route path="/login" component={ Login } />
        <Route to="/error" component={ ErrorPage } />
        <Redirect to="/error" />
      </Switch>
    </section>
  </>
</MyRoute>, document.getElementById('root'));
