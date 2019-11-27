import React from 'react';
import './home.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom'
import Recomment from '../../components/recommend/recommend'
import FocusOn from '../../components/focusOn/focusOn'
import HotList from '../../components/hotList/hotList'
function Index() {
  return (
    <div className="app">
      <h3>首页</h3>
     
      <Router>
        <NavLink to="/recommend">推荐</NavLink>
        <NavLink to="/focusOn">关注</NavLink>
        <NavLink to="/hotList">热榜</NavLink>
        <hr></hr>
        <Switch>
           {/* 难点：默认一级导航为首页、默认二级导航为推荐 */}
          <Route path="/recommend" component={ Recomment } exact></Route>
          
          <Route path="/focusOn" component={ FocusOn }></Route>
          <Route path="/hotList" component={ HotList }></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Index;
/* 
  难点：Recomment作为首页下的二级路由的第一个，需要默认展示
  但是只有点击进去才能展示，默认路径为localhost://3000/recomment的话，就会跳到404页面
*/
