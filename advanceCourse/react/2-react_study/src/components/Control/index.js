/* 
  受控组件 - 通过状态控制组件形态
*/
import React from 'react';
const {log} = console;

/* 
  第一种形式，创建对应个数的方法控制不同的形态
  比如，A按钮和B按钮分别触发A函数和B函数，通过不同的函数来知道是谁的状态
*/
/* class Control extends React.Component {
  constructor(){
    super()
  }
  state = {
    taskA : '',
    taskB : '',
    dataList: [],
  }
  render(){
    const control = <div>
      <h3>受控组件</h3>
      <div className="wrapper">
        <div>
          <input 
            type="text" 
            value={ this.state.taskA} 
            onChange={ this.handleChangeA }
          />
          <button onClick={ this.handleClickA }>A添加</button>
        </div>
        <div>
          <input 
            type="text" 
            value={ this.state.taskB} 
            onChange={ this.handleChangeB }
          />
          <button onClick={ this.handleClickB }>B添加</button>
        </div>
        <ul>
          {
            this.state.dataList.map((el,i)=>{
              // map里要写return
              return <li key={'list'+i}>
                第 {el} 项
                <span
                  className="del"
                  onClick={ () => {
                    this.handleDelete(i)
                  } }
                >X</span>
              </li>
            })
          }
        </ul>
      </div>
    </div>
    return control;
  }

  // 方法们
  // A的对应函数控制A的状态
  handleChangeA = (e) =>{
    this.setState({
      taskA: e.target.value
    })
  }

  handleClickA = () => {
    if(this.state.taskA){
      this.setState({
        dataList: [...this.state.dataList, this.state.taskA],
        taskA: ''
      })
    }
  }

  // B的对应函数控制B的状态
  handleChangeB = (e) =>{
    this.setState({
      taskB: e.target.value
    })
  }

  handleClickB = () => {
    if(this.state.taskB){
      this.setState({
        dataList: [...this.state.dataList, this.state.taskB],
        taskB: ''
      })
    }
  }

  // 删除
  handleDelete = (index) => {
    let dataList = this.state.dataList
    dataList.splice(index,1)
    this.setState({
      dataList
    })
  }
} */

/* 第二种形式，多个形态公用一套函数，通过name属性等标识区分不同的状态
  比如A按钮和B按钮公用一个click函数，通过click回调事件获取dom身上的name或data-等属性，知道是谁触发的
  以往处理同类问题，多使用函数传参区分不同的人调用的情况。这里有了dom夹持，可以用data-或表单元素的name属性来区分使用者了。
 */
class Control extends React.Component {
  // constructor(){
  //   super()
  // }
  state = {
    taskA : '',
    taskB : '',
    dataList: [],
  }
  render(){
    const control = <div>
      <h3>受控组件</h3>
      <div className="wrapper">
        <div>
          <input 
            type="text" 
            value={ this.state.taskA} 
            name="taskA"
            onChange={ this.handleChange }
          />
          <button onClick={ this.handleClick } name="taskA">A添加</button>
        </div>
        <div>
          <input 
            type="text" 
            name="taskB"
            value={ this.state.taskB} 
            onChange={ this.handleChange }
          />
          <button onClick={ this.handleClick } name="taskB">B添加</button>
        </div>
        <ul>
          {
            this.state.dataList.map((el,i)=>{
              // map里要写return
              return <li key={'list'+i}>
                第 {el} 项
                <span
                  className="del"
                  onClick={ () => {
                    this.handleDelete(i)
                  } }
                >X</span>
              </li>
            })
          }
        </ul>
      </div>
    </div>
    return control;
  }

  /* 方法们 */
  // 通过name方法，得知处理那个状态。成为受控组件。
  handleChange = (e) =>{
    log(e.target.name)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = (e) => {
    log(e.target.name)
    let name = e.target.name;
    if(this.state[name]){
      this.setState({
        dataList: [...this.state.dataList, this.state[name]],
        [name]: ''
      })
    }
  }

  // 删除
  handleDelete = (index) => {
    let dataList = this.state.dataList
    dataList.splice(index,1)
    this.setState({
      dataList
    })
  }
}
export default Control;