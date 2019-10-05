/* 
  非受控组件
*/
import React from 'react'
const {log} = console;

class UnControl extends React.Component {
  constructor(){
    super();
    // this.taskC = React.createRef(); //写法一
  }
  taskC = React.createRef(); //写法二
  state = {
    // taskA: '',
    // taskB: '',
    dataList: []
  }
  render(){
    const uncontrol = <>
      <h3>非受控组件</h3>
      <div className="wrapper">
        <div>
          <input 
            type="text" 
            ref = {
              (dom) => {
                log(dom,this) //打印dom为什么为空？
                this.taskA = dom; // this是谁的？
              }
            } //相当于给input框起了个名字。 这里边可以写一个箭头函数，箭头函数的参数就是当前input框的DOM对象
          />
          <button name="taskA" onClick={ this.handleClick }>A添加</button>
        </div>
        <div>
          <input 
            type="text" 
            ref = {
              (dom) => {
                log(dom)
                this.taskB = dom;
              }
            } //相当于给input框起了个名字。 这里边可以写一个箭头函数，箭头函数的参数就是当前input框的DOM对象
          />
          <button name="taskB" onClick={ this.handleClick }>B添加</button>
        </div>
        {/* 第二种写法：React.createRef()  V16.3+才支持 */}
        <div>
          <input 
            type="text" 
            ref = { this.taskC }
          />
          <button name="taskC" onClick={ this.handleClick }>C添加</button>
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
    </>
    return uncontrol;
  }

  handleClick = (e) => {
    let name = e.target.name, value = null;
    log(this[name],this[name].value) //根据当前点击按钮的name，得到对应input及其value值。
    if(name == 'taskC'){ // 用React.createRef创建的dom元素，node节点在current属性下。
      value = this[name].current.value;
      this[name].current.value = ''; //用完清空
    }else{
      value = this[name].value;
      this[name].value = ''; //用完清空
    }
    // 判断，如果对应input中value有数据，则设置state的list
    if(value)
      this.setState({
        dataList: [...this.state.dataList, value]
      })
  }

  handleDelete = (index) => {
    let dataList = this.state.dataList;
    dataList.splice(index,1);
    this.setState({
      dataList
    })
  }
}

export default UnControl;