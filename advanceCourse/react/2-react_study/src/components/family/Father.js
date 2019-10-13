import React from 'react';
import GrandSon from './GrandSon'
const {log} = console;

class Father extends React.Component {
  // constructor(){
  //   super();
  // }
  state = {
    
  }

  render(){
    // 此时需要中间的Father组件做一次代理的角色，把数据纯中转一遍。
    const { todoList,handleDelete } = this.props;
    let Father = <>
      {/* <h3>父亲组件</h3> */}
      <ul>
        {
          todoList.map((el,i) => 
            <GrandSon
              key={'myson' + i} 
              value={ el } 
              index= { i } 
              handleDelete={ handleDelete }
            />
          )
        }
      </ul>
    </>
    return Father;
  }
}

export default Father;