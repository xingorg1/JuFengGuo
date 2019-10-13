import React from 'react';
const {log} = console;

class GrandSon extends React.Component {
  // constructor(){
  //   super();
  // }
  state = {
    
  }

  render(){
    const {value, index, handleDelete } = this.props;
    // 最后目标组件接收到上层祖宗传过来的功能函数，进行调用并传对应的参数即可调用祖宗的方法。
    let GrandSon = <li key={'son' + index}>
        {/* 孙级组件 */}
        { value }
        <span className="del" onClick={ () => { handleDelete(index) } }>X</span>
    </li>
    return GrandSon;
  }
}

export default GrandSon;