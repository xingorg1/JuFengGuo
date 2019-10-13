import React from 'react';
import Consumer from './Consumer'

class CenterComp extends React.Component {
  render(){
    {/* 中间其他组件 - 事不关己高高挂起。他不需要掺和到提供者和消费者的交接中去了。 */}
    const { todoList } = this.props;
    let CenterComp = <>
      <ul>
        {
          todoList.map((el,i) => 
            <Consumer
              key={'myson' + i} 
              value={ el } 
              index= { i } 
            />
          )
        }
      </ul>
    </>
    return CenterComp;
  }
}

export default CenterComp;