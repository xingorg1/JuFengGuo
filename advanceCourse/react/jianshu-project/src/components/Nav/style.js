import styled from 'styled-components'

export const NavWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
`
export const Ul = styled.ul`
  overflow: hidden;
`

export const Li = styled.li`
  display: inline-block;
  padding: 0 20px;
  font-size: 17px;
  cursor: pointer;
  &:hover,
  &.active{
    color: #ea6f5a;
  }
`
