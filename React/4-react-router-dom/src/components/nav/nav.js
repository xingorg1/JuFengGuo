import React from 'react';
import { 
	NavLink
} from 'react-router-dom'

import Search from '../search/search'
function Nav() {
  return (
    <div className="nav-box">
      <span className="logo">logo</span>
      <NavLink to="/" exact>首页</NavLink>
      <NavLink to="/product">发现</NavLink>
      <NavLink to="/answer">等你来答</NavLink>
      <Search />
      <NavLink to="/notice">通知图标</NavLink>
      <NavLink to="/message">消息图标</NavLink>
      <NavLink to="/center">个人中心头像</NavLink>
      <NavLink to="/login">登录</NavLink>
    </div>
  );
}

export default Nav;
