import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {
  render(){
    const { item, index, deleteFn } = this.props
    return (<li className="todolist-li">
        { item } 
        {/* + { this.props.testVal } */}
        <button 
          className="todolist-btn todolist-del" 
          onClick={ () => { deleteFn(index) } }
        >-</button>
      </li>)
  }
}

TodoItem.propTypes = { // 注意这里小写
  item: PropTypes.string,
  index: PropTypes.number,
  deleteFn: PropTypes.func
}

TodoItem.defaultProps = {
  testVal: '默认值'
}
export default TodoItem