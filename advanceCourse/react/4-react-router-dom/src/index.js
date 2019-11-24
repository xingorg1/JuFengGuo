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
import Home from './pages/index/index'
import Login from './pages/login/login';
import Center from './pages/center/center';
import Product from './pages/product/product';
import ErrorPage from './pages/error/error';
ReactDOM.render(<MyRoute>
  <>
    <nav className="nav-box">
      <NavLink to="/" exact>首页</NavLink>
      <NavLink to="/login">登陆</NavLink>
      <NavLink to="/center">个人中心</NavLink>
      <NavLink to="/product">产品界面</NavLink>
    </nav>
    <section className="section-cont">
      <Switch>
        <Route path="/" component={ Home } exact />
        <Route path="/login" component={ Login } />
        <Route path="/center" component={ Center } />
        <Route path="/product" component={ Product } />
        <Route to="/error" component={ ErrorPage } />
        <Redirect to="/error" />
      </Switch>
    </section>
  </>
</MyRoute>, document.getElementById('root'));
