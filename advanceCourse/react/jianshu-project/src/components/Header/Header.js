import React from 'react'
import {
  HeaderWrapper,
  Logo,
  NavItem,
  Button,
  Beta
} from './style'
import Nav from '@comp/Nav/Nav'
import Aa from '@comp/Aa/Aa'
import User from '@comp/User/User'
import Search from '@comp/Search/Search'
import {
  Right
} from '@css/var'
export default class Header extends React.Component {
  render() {
    return (<>
      <HeaderWrapper className="fatherBox clearfix">
        <Logo />
        <Nav />
        <Search />
        {/* <NavItem className="left">左浮动</NavItem> */}
        <Right>
          <Aa />
          <Beta href="/" />
          <User />
          <Button><i className="iconfont icon-yumaobi" /> 写文章</Button>
          <Button className="reg">注册</Button>
        </Right>
      </HeaderWrapper>
    </>)
  }
}