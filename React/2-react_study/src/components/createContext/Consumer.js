import React from 'react';
import { Consumer } from './context' //需要接收Provider的传值，就要用到这个组件了。
// const {log} = console;

class ConsumerComp extends React.Component {
  render(){
    // {/* 消费者组件 - Consumer */}
    const {value, index } = this.props;
    // Consumer也是一个组件，用来包裹需要使用Provider提供值的标签。
    let ConsumerComp = <Consumer>
      { // JSX语法括号
        // Consumer组件内部需要是一个对象。
        ({
          handleDelete, // 对象的参数是要接收自Provider的值。
          othertest // 可以接收很多值。这个是个测试
        }) => {
          // 测试多个值
          // { log(othertest) }

          // 返回的是要渲染的结果
          return <li key={'consumer' + index}>
            { value }
            <span className="del" onClick={ () => { handleDelete(index) } }>X</span>
          </li>
        }
      }
    </Consumer>
    return ConsumerComp;
  }
}

export default ConsumerComp;