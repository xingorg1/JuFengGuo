import React from 'react';
import { SearchWrapper, Input, Icon } from './style'
export default class User extends React.Component {
  render() {
    return <SearchWrapper>
      <Input placeholder="搜索"></Input>
      <Icon className="iconfont icon-sousuo"></Icon>
    </SearchWrapper>
  }
}