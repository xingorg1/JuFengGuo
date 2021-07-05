import React from 'react'
import {
  NavWrapper,
  Ul,
  Li
} from './style'

export default class Nav extends React.Component {
  render() {
    return <NavWrapper>
      <Ul>
        <Li className="active">首页</Li>
        <Li>下载APP</Li>
      </Ul>
    </NavWrapper>
  }
}