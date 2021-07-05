import styled from 'styled-components';
import logoPic from '@img/nav-logo.png'
import betaPic from '@img/nav_jsds_beta.png'
export const HeaderWrapper = styled.div`
  position: realtive;
  padding: 0 200px;
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #eee;
  &.fatherBox {
    
  }
  &.clearfix {
    &::after{
      content: '';
      clear: both;
      display: block;
      overflow: hidden;
    }
  }
`

export const Logo = styled.a.attrs({
  href: '/'
})`
  float: left;
  width: 100px;
  height: 56px;
  line-height: 56px;
  background: url(${logoPic});
  background-size: 100% 100%;
`

export const Button = styled.button.attrs({
})`
  float: right;
  width: 100px;
  padding: 0 12px;
  height: 40px;
  line-height: 24px;
  margin: 8px 12px 0;
  border-radius: 20px;
  font-size: 15px;
  color: #fff;
  background-color: #ea6f5a;
  cursor: pointer;
  &:hover{
    background-color: #ec6149;
  }
  &.reg{
    width: 80px;
    background-color: #fff;
    color: #ea6f5a;
    border: 1px solid #ea6f5a;
    &:hover{
      background-color: rgba(236,97,73,.05);
    }
  }
`
export const Beta = styled.a`
  display: inline-block;
  width: 57px;
  height: 25px;
  margin: 0 27px;
  background: url(${betaPic});
  background-size: 100% 100%;
  vertical-align: middle;
`
export const NavItem = styled.div`
  &.left {
    float: left
  }
`