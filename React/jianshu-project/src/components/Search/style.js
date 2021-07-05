import styled from 'styled-components'

export const SearchWrapper = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  padding: 0 15px;
  cursor: pointer;
`

export const Input = styled.input`
  padding: 0 40px 0 20px;
  width: 160px;
  height: 38px;
  font-size: 14px;
  border: 1px solid #eee;
  border-radius: 40px;
  background: #eee;
  outline: none;
  transition: width .25s linear;
  &::placeholder{
    color: #a0a0a0;
  }
  &:focus{
    width: 200px;
  }
  &:focus + .iconfont{
    color: #fff;
    background: #969696;
  }
`

export const Icon = styled.i`
  &.icon-sousuo{
    position: absolute;
    right: 20px;
    top: 13px;
    bottom: 10px;
    font-size: 24px;
    line-height: 30px;
    height: 30px;
    padding: 0 3px;
    border-radius: 50%;
    /* transition: all .35s linear; */
  }
  /* &.focus{
    color: #fff;
    background: #969696;
  } */
`
